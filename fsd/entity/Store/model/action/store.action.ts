"use server";
import { categoryAction } from "@/fsd/entity/Category";
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
  IIsOwnerPayload,
  IIsUniqueStorePayload,
  IRenameStorePayload,
} from "../../type/action.type";
import { IStore } from "../../type/entity.type";
import { StoreResponseErrorEnum } from "../../type/responseError.enum";
import { storeRepo } from "../repo";

export const createStore = cache(
  async (
    name: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IStore | null>> => {
    try {
      const udata = await checkAuthUser(checkAuth);

      const userId = udata!.id as string;
      const isUniqueResponse = await isUnique({
        name,
        userId,
      });

      if (!isUniqueResponse) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const slug = slugGenerator(name);
      const store = await storeRepo.createStore({
        name,
        userId,
        slug,
      });
      if (!store) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(store);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const getStore = cache(
  async (
    storeId: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IStore | null>> => {
    try {
      await checkAuthUser(checkAuth);

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
      return buildErrorResponse(status, error);
    }
  },
);

export const getStoreBySlug = cache(
  async (
    slug?: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IStore | null>> => {
    try {
      if (!slug) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_SLUG_EMPTY,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      const udata = await checkAuthUser(checkAuth);

      const userId = udata!.id as string;

      const store = await storeRepo.getStoreBySlug({
        slug,
        userId,
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
      return buildErrorResponse(status, error);
    }
  },
);

export const getStoreStoreFirst = cache(
  async (
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IStore | null>> => {
    try {
      const udata = await checkAuthUser(checkAuth);

      const userId = udata!.id;

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
      return buildErrorResponse(status, error);
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
      return buildErrorResponse(status, error);
    }
  },
);

export const renameStore = cache(
  async (
    data: IRenameStorePayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IStore | null>> => {
    const { currentStoreName, newStoreName } = data;
    try {
      const udata = await checkAuthUser(checkAuth);

      const userId = udata!.id;

      // Exist old store
      const isExistResponse = await isExist({ userId, name: currentStoreName });
      if (!isExistResponse) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NOT_EXIST,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      // Unique new store
      const isUniqueResponse = await isUnique({ userId, name: newStoreName });
      if (!isUniqueResponse) {
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
        userId,
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
      return buildErrorResponse(status, error);
    }
  },
);

export const removeStore = cache(
  async (
    storeId: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IStore | null>> => {
    try {
      const udata = await checkAuthUser(checkAuth);

      const userId = udata!.id;
      const isOwnerResponse = await isOwner({
        storeId,
        userId,
      });

      if (!isOwnerResponse) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_NO_OWNER,
          HTTPStatusEnum.FORBIDDEN,
        );
      }
      const relationCategory = await isRelationCategory(storeId);

      if (relationCategory) {
        throw new HttpException(
          StoreResponseErrorEnum.RELATION_CAT_USE,
          HTTPStatusEnum.BAD_REQUEST,
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
      return buildErrorResponse(status, error);
    }
  },
);

const isRelationCategory = async (storeId: string): Promise<boolean> => {
  const { data } = await categoryAction.getCategoryListByStoreId(storeId);
  return !!data?.length;
};

const isUnique = cache(
  async (data: IIsUniqueStorePayload): Promise<boolean> =>
    !(await storeRepo.getStoreByName(data)),
);

const isExist = cache(
  async (data: IIsUniqueStorePayload): Promise<boolean> =>
    !!(await storeRepo.getStoreByName(data)),
);

const isOwner = cache(
  async (data: IIsOwnerPayload): Promise<boolean> =>
    !!(await storeRepo.getStoreIsOwner(data)),
);
