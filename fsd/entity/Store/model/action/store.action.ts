"use server";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { getUser } from "@/fsd/shared/modle/action/auth.action";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { StoreResponseErrorEnum } from "../../type/responseError.enum";
import { IStore } from "../../type/store.type";
import { storeRepo } from "../repo";
import { IIsOwnerAction, IRenameStoreAction } from "../../type/action.type";
import { cache } from "react";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";

export const createStore = async (
  storeName: string,
): Promise<ResponseDataAction<IStore | null>> => {
  try {
    const userResponse = await getUser();
    if (userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return buildResponse(null, error, status);
    }

    const isUniqueResponse = await isUnique(storeName);
    if (isUniqueResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isUniqueResponse;
      return buildResponse(null, error, status);
    }
    const slug = slugGenerator(storeName);
    const store = await storeRepo.createStore({
      name: storeName,
      slug,
      userId: userResponse.data?.id as string,
    });
    if (!store) {
      return buildResponse(
        null,
        StoreResponseErrorEnum.STORE_NOT_CREATED,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }
    return buildResponse(store);
  } catch (e) {
    return buildResponse(
      null,
      HTTPErrorMessage.SERVER_ERROR,
      HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    );
  }
};

export const getStoreBySlug = cache(
  async (slug?: string): Promise<ResponseDataAction<IStore | null>> => {
    try {
      const userResponse = await getUser();
      if (userResponse.status !== HTTPStatusEnum.OK) {
        const { error, status } = userResponse;
        return buildResponse(null, error, status);
      }
      if (!slug) {
        return buildResponse(
          null,
          StoreResponseErrorEnum.STORE_SLUG_EMPTY,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      const store = await storeRepo.getStoreBySlugAndUserId({
        slug,
        userId: userResponse.data?.id as string,
      });
      if (!store) {
        return buildResponse(
          null,
          StoreResponseErrorEnum.STORE_NOT_FOUND,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(store);
    } catch (e) {
      return buildResponse(
        null,
        HTTPErrorMessage.SERVER_ERROR,
        HTTPStatusEnum.INTERNAL_SERVER_ERROR,
      );
    }
  },
);

export const getStoreStoreFirst = async (): Promise<
  ResponseDataAction<IStore | null>
> => {
  try {
    const userResponse = await getUser();
    if (!userResponse.data || userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return buildResponse(null, error, status);
    }

    const userId = userResponse.data.id;
    const store = await storeRepo.getStoreFirst(userId);
    if (!store) {
      return buildResponse(
        null,
        StoreResponseErrorEnum.STORE_LIST_NOT_FOUND,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }
    return buildResponse(store);
  } catch (e) {
    return buildResponse(
      null,
      HTTPErrorMessage.SERVER_ERROR,
      HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    );
  }
};

export const getStoreListByUserId = async (
  userId: string,
): Promise<ResponseDataAction<IStore[] | null>> => {
  try {
    const storeList = await storeRepo.getStoreList(userId);
    if (!storeList) {
      return buildResponse(
        null,
        StoreResponseErrorEnum.STORE_LIST_NOT_FOUND,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }
    return buildResponse(storeList);
  } catch (e) {
    return buildResponse(
      null,
      HTTPErrorMessage.SERVER_ERROR,
      HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    );
  }
};

export const renameStore = async (
  data: IRenameStoreAction,
): Promise<ResponseDataAction<IStore | null>> => {
  const { currentStoreName, newStoreName } = data;
  try {
    const userResponse = await getUser();
    if (userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return buildResponse(null, error, status);
    }

    // Exist old store
    const isExistResponse = await isExist(currentStoreName);
    if (isExistResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isExistResponse;
      return buildResponse(null, error, status);
    }

    // Unique new store
    const isUniqueResponse = await isUnique(newStoreName);
    if (isUniqueResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isUniqueResponse;
      return buildResponse(null, error, status);
    }

    const newSlug = slugGenerator(newStoreName);
    const store = await storeRepo.renameStore({
      currentStoreName,
      newStoreName: newStoreName.trim(),
      newSlug,
      userId: userResponse.data?.id as string,
    });

    if (!store) {
      return buildResponse(
        null,
        StoreResponseErrorEnum.STORE_NOT_UPDATED,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }

    return buildResponse(store);
  } catch (e) {
    return buildResponse(
      null,
      HTTPErrorMessage.SERVER_ERROR,
      HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    );
  }
};

export const removeStoreById = async (
  storeId: string,
): Promise<ResponseDataAction<IStore | null>> => {
  try {
    const userResponse = await getUser();
    if (!userResponse.data || userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return buildResponse(null, error, status);
    }

    const userId = userResponse.data.id;
    const isOwnerResponse = await isOwner({
      storeId,
      userId: userResponse.data.id,
    });
    if (isOwnerResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isOwnerResponse;
      return buildResponse(null, error, status);
    }

    const store = await storeRepo.removeStoreBy({ storeId, userId });

    if (!store) {
      return buildResponse(
        null,
        StoreResponseErrorEnum.STORE_NOT_UPDATED,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }
    return buildResponse(store);
  } catch (e) {
    return buildResponse(
      null,
      HTTPErrorMessage.SERVER_ERROR,
      HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    );
  }
};

const isUnique = async (
  storeName: string,
): Promise<ResponseDataAction<boolean>> => {
  const store = await storeRepo.getStoreByName(storeName);
  if (store) {
    return buildResponse(
      false,
      StoreResponseErrorEnum.STORE_EXIST,
      HTTPStatusEnum.BAD_REQUEST,
    );
  }
  return buildResponse(true);
};

const isExist = async (
  storeName: string,
): Promise<ResponseDataAction<boolean>> => {
  const store = await storeRepo.getStoreByName(storeName);
  if (!store) {
    return buildResponse(
      false,
      StoreResponseErrorEnum.STORE_NOT_EXIST,
      HTTPStatusEnum.BAD_REQUEST,
    );
  }
  return buildResponse(true);
};

const isOwner = async (
  data: IIsOwnerAction,
): Promise<ResponseDataAction<boolean>> => {
  const store = await storeRepo.getStoreIsOwner(data);
  if (!store) {
    return buildResponse(
      false,
      StoreResponseErrorEnum.STORE_NO_OWNER,
      HTTPStatusEnum.FORBIDDEN,
    );
  }
  return buildResponse(true);
};
