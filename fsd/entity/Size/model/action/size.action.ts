"use server";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { authAction } from "@/fsd/shared/model/action";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import {
  ICreateSizePayload,
  IGetSizeBySlugPayload,
  IIsCurrentSizePayload,
  IIsOwnerPayload,
  IIsUniqueSizePayload,
  IUpdateSizePayload,
} from "../../type/action.type";
import { ISize, ISizeWithRelations } from "../../type/entity.type";
import { SizeResponseErrorEnum } from "../repo/responseError.enum";
import { sizeRepo } from "../repo/size.repo";
import { storeAction } from "@/fsd/entity/Store";
import { buildError } from "@/fsd/shared/lib/buildError";

export const createSize = cache(
  async (
    data: ICreateSizePayload,
  ): Promise<ResponseDataAction<ISize | null>> => {
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
          SizeResponseErrorEnum.SIZE_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const storeResponse = await storeAction.getStore(storeId);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const slug = slugGenerator(name);

      const size = await sizeRepo.createSize({ ...data, slug });

      if (!size) {
        throw new HttpException(
          SizeResponseErrorEnum.SIZE_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(size);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getSize = cache(
  async (sizeId: string): Promise<ResponseDataAction<ISize | null>> => {
    try {
      const size = await sizeRepo.getSize(sizeId);
      if (!size) {
        throw new HttpException(
          SizeResponseErrorEnum.SIZE_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }
      return buildResponse(size);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getSizeBySlug = cache(
  async (
    data: IGetSizeBySlugPayload,
  ): Promise<ResponseDataAction<ISize | null>> => {
    try {
      const { storeSlug, sizeSlug } = data;

      const storeResponse = await storeAction.getStoreBySlug(storeSlug);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const store = storeResponse.data;

      const size = await sizeRepo.getSizeBySlug({
        sizeSlug,
        storeId: store!.id,
      });
      if (!size) {
        throw new HttpException(
          SizeResponseErrorEnum.SIZE_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }
      return buildResponse(size);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getSizeListByStoreId = cache(
  async (storeId: string): Promise<ResponseDataAction<ISize[] | null>> => {
    try {
      const sizeList = await sizeRepo.getSizeList(storeId);
      return buildResponse(sizeList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getSizeListByStoreSlug = cache(
  async (
    storeSlug: string,
  ): Promise<ResponseDataAction<ISizeWithRelations[] | null>> => {
    try {
      const sizeList = await sizeRepo.getSizeListByStoreSlug(storeSlug);

      return buildResponse(sizeList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getSizeListByCategory = cache(
  async (billboardId: string): Promise<ResponseDataAction<ISize[] | null>> => {
    try {
      const sizeList = await sizeRepo.getSizeByCategory(billboardId);
      return buildResponse(sizeList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const updateSize = cache(
  async (
    data: IUpdateSizePayload,
  ): Promise<ResponseDataAction<ISize | null>> => {
    try {
      const { error, status } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const { storeId, sizeId, name, value } = data;

      const storeResponse = await storeAction.getStore(storeId);
      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const isExistResponse = await isExist(sizeId);

      if (!isExistResponse) {
        throw new HttpException(
          SizeResponseErrorEnum.SIZE_NOT_EXIST,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const isCurrentResponse = await isCurrent({ name, sizeId });

      if (!isCurrentResponse) {
        const isUniqueResponse = await isUnique({ name, storeId });

        if (!isUniqueResponse) {
          throw new HttpException(
            SizeResponseErrorEnum.SIZE_NOT_UNIQUE,
            HTTPStatusEnum.BAD_REQUEST,
          );
        }
      }

      const newSlug = slugGenerator(name);

      const size = await sizeRepo.updateSize({
        sizeId,
        name,
        newSlug,
        value,
      });

      if (!size) {
        throw new HttpException(
          SizeResponseErrorEnum.SIZE_NOT_UPDATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(size);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const removeSize = cache(
  async (sizeId: string): Promise<ResponseDataAction<ISize | null>> => {
    try {
      const { error, status, data: udata } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const size = await getSize(sizeId);
      const { data } = size;

      if (!data) {
        throw new HttpException(
          SizeResponseErrorEnum.SIZE_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const userId = udata!.id;
      const isOwnerResponse = await isOwner({
        sizeId: data.id,
        userId,
      });
      if (!isOwnerResponse) {
        throw new HttpException(
          SizeResponseErrorEnum.SIZE_NO_OWNER,
          HTTPStatusEnum.FORBIDDEN,
        );
      }

      const sizeRemover = await sizeRepo.removeSize({
        sizeId,
      });

      if (!sizeRemover) {
        throw new HttpException(
          SizeResponseErrorEnum.SIZE_NOT_REMOVED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      return buildResponse(sizeRemover);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

const isUnique = async (data: IIsUniqueSizePayload): Promise<boolean> =>
  !(await sizeRepo.getSizeByName(data));

const isCurrent = async (data: IIsCurrentSizePayload): Promise<boolean> => {
  const { name, sizeId } = data;
  const cat = await sizeRepo.getSize(sizeId);
  const isCurrent = cat && cat.name === name;

  return !!isCurrent;
};

const isExist = cache(
  async (sizeId: string): Promise<boolean> =>
    !!(await sizeRepo.getSize(sizeId)),
);

const isOwner = cache(
  async (data: IIsOwnerPayload): Promise<boolean> =>
    !!(await sizeRepo.getSizeIsOwner(data)),
);
