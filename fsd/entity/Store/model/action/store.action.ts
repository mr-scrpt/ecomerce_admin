"use server";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { authAction } from "@/fsd/shared/modle/action";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import {
  IIsOwnerPayload,
  IIsUniqueStorePayload,
  IRenameStorePayload,
} from "../../type/action.type";
import { StoreResponseErrorEnum } from "../../type/responseError.enum";
import { storeRepo } from "../repo";
import { IStore } from "../../type/entity.type";

export const createStore = cache(
  async (storeName: string): Promise<ResponseDataAction<IStore | null>> => {
    try {
      const userResponse = await authAction.getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }

      const isUniqueResponse = await isUnique({
        storeName,
        userId: userResponse.data!.id,
      });
      if (isUniqueResponse) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      const slug = slugGenerator(storeName);
      const store = await storeRepo.createStore({
        name: storeName,
        slug,
        userId: userResponse.data?.id as string,
      });
      if (!store) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(store);
    } catch (e) {
      console.log(" =>>>err", e);
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getStore = cache(
  async (storeId: string): Promise<ResponseDataAction<IStore | null>> => {
    try {
      const userResponse = await authAction.getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }
      const store = await storeRepo.getStore(storeId);
      if (!store) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }
      return buildResponse(store);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getStoreBySlug = cache(
  async (slug?: string): Promise<ResponseDataAction<IStore | null>> => {
    try {
      if (!slug) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_SLUG_EMPTY,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      const userResponse = await authAction.getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }

      const store = await storeRepo.getStoreBySlug({
        slug,
        userId: userResponse.data?.id as string,
      });
      if (!store) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }
      return buildResponse(store);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getStoreStoreFirst = cache(
  async (): Promise<ResponseDataAction<IStore | null>> => {
    try {
      const userResponse = await authAction.getAuthUser();

      if (userResponse.error) {
        throw new Error(userResponse.error);
      }

      const userId = userResponse.data!.id;
      const store = await storeRepo.getStoreFirst(userId);
      if (!store) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }
      return buildResponse(store);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getStoreListByUserId = cache(
  async (userId: string): Promise<ResponseDataAction<IStore[] | null>> => {
    try {
      const storeList = await storeRepo.getStoreList(userId);
      return buildResponse(storeList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const renameStore = cache(
  async (
    data: IRenameStorePayload,
  ): Promise<ResponseDataAction<IStore | null>> => {
    const { currentStoreName, newStoreName } = data;
    try {
      const userResponse = await authAction.getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }

      // Exist old store
      const isExistResponse = await isExist(currentStoreName);
      if (!isExistResponse) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_EXIST,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      // Unique new store
      const isUniqueResponse = await isUnique(newStoreName);
      if (isUniqueResponse) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const newSlug = slugGenerator(newStoreName);
      const store = await storeRepo.renameStore({
        currentStoreName,
        newStoreName: newStoreName.trim(),
        newSlug,
        userId: userResponse.data?.id as string,
      });

      if (!store) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_UPDATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      return buildResponse(store);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const removeStoreById = cache(
  async (storeId: string): Promise<ResponseDataAction<IStore | null>> => {
    try {
      const userResponse = await authAction.getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }

      const userId = userResponse.data!.id;
      const isOwnerResponse = await isOwner({
        storeId,
        userId,
      });
      if (isOwnerResponse) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NO_OWNER,
          HTTPStatusEnum.FORBIDDEN,
        );
      }

      const store = await storeRepo.removeStoreBy({ storeId, userId });

      if (!store) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_REMOVED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(store);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

const isUnique = cache(
  async (data: IIsUniqueStorePayload): Promise<boolean> =>
    !!(await storeRepo.getStoreByName(data)),
);

const isExist = cache(
  async (storeName: string): Promise<boolean> =>
    !!(await storeRepo.getStoreByName(storeName)),
);

const isOwner = cache(
  async (data: IIsOwnerPayload): Promise<boolean> =>
    !!(await storeRepo.getStoreIsOwner(data)),
);
