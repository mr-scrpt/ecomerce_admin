"use server";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { IBillboard } from "../../type/entity.type";
import { authAction } from "@/fsd/shared/modle/action";
import {
  ICreateBillboardPayload,
  IGetBillboardPayload,
  IIsUniqueBillboardPayload,
  IUpdateBillboardPayload,
} from "../../type/action.type";
import { billboardRepo } from "../repo/billboard.repo";
import { storeAction } from "@/fsd/entity/Store";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { BillboardResponseErrorEnum } from "../repo/responseError.enum";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { buildError } from "@/fsd/shared/lib/buildError";
import { cache } from "react";

export const createBillboard = cache(
  async (
    data: ICreateBillboardPayload,
  ): Promise<ResponseDataAction<IBillboard | null>> => {
    try {
      const userResponse = await authAction.getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }

      const { storeId, name } = data;

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
        throw new Error(storeResponse.error);
      }

      const billboard = await billboardRepo.createBillboard(data);

      if (!billboard) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(billboard);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getBillboard = cache(
  async (
    billboardId: string,
  ): Promise<ResponseDataAction<IBillboard | null>> => {
    try {
      const userResponse = await authAction.getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }
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
      return buildResponse(null, error, status);
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
      return buildResponse(null, error, status);
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
      return buildResponse(null, error, status);
    }
  },
);

export const updateBillboard = cache(
  async (
    data: IUpdateBillboardPayload,
  ): Promise<ResponseDataAction<IBillboard | null>> => {
    try {
      const userResponse = await authAction.getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }

      const { storeId, billboardId, name, imgUrl } = data;

      const storeResponse = await storeAction.getStore(storeId);
      if (storeResponse.error) {
        throw new Error(storeResponse.error);
      }

      const isExistResponse = await isExist({ name, storeId });
      if (!isExistResponse) {
        throw new HttpException(
          BillboardResponseErrorEnum.BILLBOARD_NOT_EXIST,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const billboard = await billboardRepo.updateBillboard({
        billboardId,
        name,
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
      return buildResponse(null, error, status);
    }
  },
);

const isUnique = async (data: IIsUniqueBillboardPayload): Promise<boolean> =>
  !(await billboardRepo.getBillboardByName(data));

const isExist = cache(
  async (data: IGetBillboardPayload): Promise<boolean> =>
    !!(await billboardRepo.getBillboardByName(data)),
);
