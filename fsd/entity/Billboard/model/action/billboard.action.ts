import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { IBillboard } from "../../type/entity.type";
import { authAction } from "@/fsd/shared/modle/action";
import {
  ICreateBillboardPayload,
  IIsUniqueBilboard,
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

      const { storeId } = data;

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

      const isExistResponse = await isExist(billboardId);
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

const isExist = cache(
  async (storeId: string): Promise<boolean> =>
    !!(await billboardRepo.getStore(storeId)),
);

const isUnique = async (data: IIsUniqueBilboard): Promise<boolean> =>
  !!(await billboardRepo.getBillboardByName(data));
