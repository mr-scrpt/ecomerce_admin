"use server";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { getAuthUser } from "@/fsd/shared/modle/action/auth.action";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import { IIsOwnerAction, IRenameStoreAction } from "../../type/action.type";
import { StoreResponseErrorEnum } from "../../type/responseError.enum";
import { IStore } from "../../type/store.type";
import { storeRepo } from "../repo";

export const createStore = async (
  storeName: string,
): Promise<ResponseDataAction<IStore | null>> => {
  try {
    const userResponse = await getAuthUser();
    if (userResponse.error) {
      throw new Error(userResponse.error);
    }

    const isUniqueResponse = await isUnique(storeName);
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
    const { error, status } = buildError(e);
    return buildResponse(null, error, status);
  }
};

export const getStoreBySlug = cache(
  async (slug?: string): Promise<ResponseDataAction<IStore | null>> => {
    try {
      if (!slug) {
        throw new HttpException(
          StoreResponseErrorEnum.STORE_SLUG_EMPTY,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      const userResponse = await getAuthUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }

      const store = await storeRepo.getStoreBySlugAndUserId({
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

export const getStoreStoreFirst = async (): Promise<
  ResponseDataAction<IStore | null>
> => {
  try {
    const userResponse = await getAuthUser();

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
};

export const getStoreListByUserId = async (
  userId: string,
): Promise<ResponseDataAction<IStore[] | null>> => {
  try {
    const storeList = await storeRepo.getStoreList(userId);
    // if (!storeList) {
    //   return buildResponse(
    //     null,
    //     StoreResponseErrorEnum.STORE_LIST_NOT_FOUND,
    //     HTTPStatusEnum.BAD_REQUEST,
    //   );
    // }
    return buildResponse(storeList);
  } catch (e) {
    const { error, status } = buildError(e);
    return buildResponse(null, error, status);
  }
};

export const renameStore = async (
  data: IRenameStoreAction,
): Promise<ResponseDataAction<IStore | null>> => {
  const { currentStoreName, newStoreName } = data;
  try {
    const userResponse = await getAuthUser();
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
};

export const removeStoreById = async (
  storeId: string,
): Promise<ResponseDataAction<IStore | null>> => {
  try {
    // const userResponse = await getAuthUser();
    // if (!userResponse.data || userResponse.status !== HTTPStatusEnum.OK) {
    //   const { error, status } = userResponse;
    //   return buildResponse(null, error, status);
    // }
    const userResponse = await getAuthUser();
    if (userResponse.error) {
      throw new Error(userResponse.error);
    }

    const userId = userResponse.data!.id;
    const isOwnerResponse = await isOwner({
      storeId,
      userId,
    });
    if (isOwnerResponse) {
      // const { error, status } = isOwnerResponse;
      // return buildResponse(null, error, status);
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
};

const isUnique = async (storeName: string): Promise<boolean> => {
  return !!(await storeRepo.getStoreByName(storeName));
  // if (store) {
  //   return buildResponse(
  //     false,
  //     StoreResponseErrorEnum.STORE_EXIST,
  //     HTTPStatusEnum.BAD_REQUEST,
  //   );
  // }
  // return buildResponse(true);
  // return !!store;
};

const isExist = async (storeName: string): Promise<boolean> => {
  return !!(await storeRepo.getStoreByName(storeName));
  // if (!store) {
  //   return buildResponse(
  //     false,
  //     StoreResponseErrorEnum.STORE_NOT_EXIST,
  //     HTTPStatusEnum.BAD_REQUEST,
  //   );
  // }
  // return buildResponse(true);
  // return !!store;
};

const isOwner = async (data: IIsOwnerAction): Promise<boolean> => {
  return !!(await storeRepo.getStoreIsOwner(data));
  // if (!store) {
  //   return buildResponse(
  //     false,
  //     StoreResponseErrorEnum.STORE_NO_OWNER,
  //     HTTPStatusEnum.FORBIDDEN,
  //   );
  // }
  // return buildResponse(true);
  // return !!store
};
