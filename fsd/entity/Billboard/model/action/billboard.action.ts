"use server";
import { categoryAction } from "@/fsd/entity/Category";
import { storeAction } from "@/fsd/entity/Store";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import {
  buildErrorResponse,
  buildResponse,
} from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { checkAuthUser } from "@/fsd/shared/model";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import {
  ICreateBillboardPayload,
  IGetBillboardBySlugPayload,
  IIsCurrentBillboardPayload,
  IIsOwnerPayload,
  IIsUniqueBillboardPayload,
  IUpdateBillboardPayload,
} from "../../type/action.type";
import { IBillboard } from "../../type/entity.type";
import { billboardRepo } from "../repo/billboard.repo";
import { BillboardResponseErrorEnum } from "../repo/responseError.enum";

export const createBillboard = cache(
  async (
    data: ICreateBillboardPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IBillboard | null>> => {
    try {
      const { storeId, name } = data;
      await checkAuthUser(checkAuth);

      const isUniqueResponse = await isUnique({
        name,
        storeId,
      });

      if (!isUniqueResponse) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const storeResponse = await storeAction.getStore(storeId);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
        // console.log(" =>>>", storeResponse.error);
        // throw new Error(storeResponse.error);
      }
      const slug = slugGenerator(name);

      const billboard = await billboardRepo.createBillboard({ ...data, slug });

      if (!billboard) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(billboard);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const getBillboard = cache(
  async (
    billboardId: string,
  ): Promise<ResponseDataAction<IBillboard | null>> => {
    try {
      const billboard = await billboardRepo.getBillboard(billboardId);

      if (!billboard) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      return buildResponse(billboard);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const getBillboardBySlug = cache(
  async (
    data: IGetBillboardBySlugPayload,
  ): Promise<ResponseDataAction<IBillboard | null>> => {
    try {
      const { storeSlug, billboardSlug } = data;

      const storeResponse = await storeAction.getStoreBySlug(storeSlug);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const store = storeResponse.data;

      const billboard = await billboardRepo.getBillboardBySlug({
        billboardSlug,
        storeId: store!.id,
      });

      if (!billboard) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      return buildResponse(billboard);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const getBillboardListByStoreId = cache(
  async (storeId: string): Promise<ResponseDataAction<IBillboard[] | null>> => {
    try {
      const billboardList = await billboardRepo.getBillboardList(storeId);
      return buildResponse(billboardList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const getBillboardListByStoreSlug = cache(
  async (
    storeSlug: string,
  ): Promise<ResponseDataAction<IBillboard[] | null>> => {
    try {
      const billboardList =
        await billboardRepo.getBillboardListByStoreSlug(storeSlug);
      return buildResponse(billboardList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const updateBillboard = cache(
  async (
    data: IUpdateBillboardPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IBillboard | null>> => {
    try {
      const { storeId, billboardId, name, imgUrl } = data;
      await checkAuthUser(checkAuth);

      const storeResponse = await storeAction.getStore(storeId);
      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const isExistResponse = await isExist(billboardId);

      if (!isExistResponse) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_EXIST,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const isCurrentResponse = await isCurrent({ name, billboardId });

      if (!isCurrentResponse) {
        const isUniqueResponse = await isUnique({ name, storeId });
        if (!isUniqueResponse) {
          throw new HttpException(
            BillboardResponseErrorEnum.BILLBOARD_NOT_UNIQUE,
            HTTPStatusEnum.BAD_REQUEST,
          );
        }
      }
      const newSlug = slugGenerator(name);

      const billboard = await billboardRepo.updateBillboard({
        billboardId,
        name,
        newSlug,
        imgUrl,
      });

      if (!billboard) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_UPDATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      return buildResponse(billboard);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const removeBillboard = cache(
  async (
    billboardId: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IBillboard | null>> => {
    try {
      const udata = await checkAuthUser(checkAuth);

      const billboard = await getBillboard(billboardId);
      const { data } = billboard;

      if (!data) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const userId = udata!.id;
      const isOwnerResponse = await isOwner({
        billboardId: data.id,
        userId,
      });
      if (!isOwnerResponse) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NO_OWNER,
          HTTPStatusEnum.FORBIDDEN,
        );
      }

      const relationCategory = await isRelationCategory(
        billboardId,
        // storeId,
      );

      if (relationCategory) {
        throw new HttpException(
          BillboardResponseErrorEnum.RELATION_CAT_USE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const billboardRemover = await billboardRepo.removeBillboard({
        billboardId,
      });

      if (!billboardRemover) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_REMOVED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      return buildResponse(billboardRemover);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

const isRelationCategory = async (billboardId: string): Promise<boolean> => {
  const { data } = await categoryAction.getCategoryListByBillboard(billboardId);
  return !!data?.length;
};

const isUnique = async (data: IIsUniqueBillboardPayload): Promise<boolean> =>
  !(await billboardRepo.getBillboardByName(data));

const isCurrent = async (
  data: IIsCurrentBillboardPayload,
): Promise<boolean> => {
  const { name, billboardId } = data;
  const bill = await billboardRepo.getBillboard(billboardId);
  const isCurrent = bill && bill.name === name;

  return !!isCurrent;
};

const isExist = cache(
  async (billboardId: string): Promise<boolean> =>
    !!(await billboardRepo.getBillboard(billboardId)),
);

const isOwner = cache(
  async (data: IIsOwnerPayload): Promise<boolean> =>
    !!(await billboardRepo.getBillboardIsOwner(data)),
);
