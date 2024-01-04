"use server";
import { storeAction } from "@/fsd/entity/Store";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { authAction } from "@/fsd/shared/modle/action";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import {
  ICreateColorPayload,
  IIsCurrentColorPayload,
  IIsOwnerPayload,
  IIsUniqueColorPayload,
  IUpdateColorPayload,
} from "../../type/action.type";
import { IColor, IColorWithRelations } from "../../type/entity.type";
import { colorRepo } from "../repo/color.repo";
import { ColorResponseErrorEnum } from "../repo/responseError.enum";
import { billboardAction } from "@/fsd/entity/Billboard";

export const createColor = cache(
  async (
    data: ICreateColorPayload,
  ): Promise<ResponseDataAction<IColor | null>> => {
    try {
      const { error, status } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const { storeId, name } = data;

      const isUniqueResponse = await isUnique({
        name,
        storeId,
      });

      if (!isUniqueResponse) {
        throw new HttpException(
          ColorResponseErrorEnum.color_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const storeResponse = await storeAction.getStore(storeId);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const slug = slugGenerator(name);

      const color = await colorRepo.createColor({ ...data, slug });

      if (!color) {
        throw new HttpException(
          ColorResponseErrorEnum.color_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(color);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getColor = cache(
  async (colorId: string): Promise<ResponseDataAction<IColor | null>> => {
    try {
      const color = await colorRepo.getColor(colorId);
      if (!color) {
        throw new HttpException(
          ColorResponseErrorEnum.color_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }
      return buildResponse(color);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getColorListByStoreId = cache(
  async (storeId: string): Promise<ResponseDataAction<IColor[] | null>> => {
    try {
      const colorList = await colorRepo.getColorList(storeId);
      return buildResponse(colorList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getColorListByStoreSlug = cache(
  async (
    storeSlug: string,
  ): Promise<ResponseDataAction<IColorWithRelations[] | null>> => {
    try {
      const colorList = await colorRepo.getColorListByStoreSlug(storeSlug);

      return buildResponse(colorList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getColorListByCategory = cache(
  async (billboardId: string): Promise<ResponseDataAction<IColor[] | null>> => {
    try {
      const colorList = await colorRepo.getColorByCategory(billboardId);
      return buildResponse(colorList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const updateColor = cache(
  async (
    data: IUpdateColorPayload,
  ): Promise<ResponseDataAction<IColor | null>> => {
    try {
      const { error, status } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const { storeId, colorId, name, value } = data;

      const storeResponse = await storeAction.getStore(storeId);
      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const billboardResponse = await billboardAction.getBillboard(value);
      if (billboardResponse.error) {
        throw new HttpException(billboardResponse.error);
      }

      const isExistResponse = await isExist(colorId);

      if (!isExistResponse) {
        throw new HttpException(
          ColorResponseErrorEnum.color_NOT_EXIST,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const isCurrentResponse = await isCurrent({ name, colorId });

      if (!isCurrentResponse) {
        const isUniqueResponse = await isUnique({ name, storeId });

        if (!isUniqueResponse) {
          throw new HttpException(
            ColorResponseErrorEnum.color_NOT_UNIQUE,
            HTTPStatusEnum.BAD_REQUEST,
          );
        }
      }

      const newSlug = slugGenerator(name);

      const color = await colorRepo.updateColor({
        colorId,
        name,
        newSlug,
        value,
      });

      if (!color) {
        throw new HttpException(
          ColorResponseErrorEnum.color_NOT_UPDATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(color);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const removeColor = cache(
  async (colorId: string): Promise<ResponseDataAction<IColor | null>> => {
    try {
      const { error, status, data: udata } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const color = await getColor(colorId);
      const { data } = color;

      if (!data) {
        throw new HttpException(
          ColorResponseErrorEnum.color_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const userId = udata!.id;
      const isOwnerResponse = await isOwner({
        colorId: data.id,
        userId,
      });
      if (!isOwnerResponse) {
        throw new HttpException(
          ColorResponseErrorEnum.color_NO_OWNER,
          HTTPStatusEnum.FORBIDDEN,
        );
      }

      const colorRemover = await colorRepo.removeColor({
        colorId,
      });

      if (!colorRemover) {
        throw new HttpException(
          ColorResponseErrorEnum.color_NOT_REMOVED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      return buildResponse(colorRemover);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

const isUnique = async (data: IIsUniqueColorPayload): Promise<boolean> =>
  !(await colorRepo.getColorByName(data));

const isCurrent = async (data: IIsCurrentColorPayload): Promise<boolean> => {
  const { name, colorId } = data;
  const cat = await colorRepo.getColor(colorId);
  const isCurrent = cat && cat.name === name;

  return !!isCurrent;
};

const isExist = cache(
  async (colorId: string): Promise<boolean> =>
    !!(await colorRepo.getColor(colorId)),
);

const isOwner = cache(
  async (data: IIsOwnerPayload): Promise<boolean> =>
    !!(await colorRepo.getColorIsOwner(data)),
);
