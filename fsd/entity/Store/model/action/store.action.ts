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
): Promise<ResponseDataAction<IStore>> => {
  try {
    const userResponse = await getUser();
    if (userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return {
        data: null,
        error,
        status,
      };
    }

    const isUniqueResponse = await isUnique(storeName);
    if (isUniqueResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isUniqueResponse;
      return {
        data: null,
        error,
        status,
      };
    }
    const slug = slugGenerator(storeName);
    const store = await storeRepo.createStore({
      name: storeName,
      slug,
      userId: userResponse.data?.id as string,
    });
    if (!store) {
      return {
        data: null,
        error: StoreResponseErrorEnum.STORE_NOT_CREATED,
        status: HTTPStatusEnum.BAD_REQUEST,
      };
    }
    return { data: store, error: null, status: HTTPStatusEnum.OK };
  } catch (e) {
    return {
      data: null,
      error: HTTPErrorMessage.SERVER_ERROR,
      status: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getStoreBySlug = cache(
  async (slug?: string): Promise<ResponseDataAction<IStore | null>> => {
    console.log(" =>>>get Store by slug");
    try {
      const userResponse = await getUser();
      if (userResponse.status !== HTTPStatusEnum.OK) {
        const { error, status } = userResponse;
        const resp = buildResponse(null, error, status);
        return {
          data: null,
          error,
          status,
        };
      }
      if (!slug) {
        const resp = buildResponse(
          null,
          StoreResponseErrorEnum.STORE_SLUG_EMPTY,
          HTTPStatusEnum.BAD_REQUEST,
        );
        return {
          data: null,
          error: StoreResponseErrorEnum.STORE_SLUG_EMPTY,
          status: HTTPStatusEnum.BAD_REQUEST,
        };
      }
      const store = await storeRepo.getStoreBySlugAndUserId({
        slug,
        userId: userResponse.data?.id as string,
      });
      if (!store) {
        const resp = buildResponse(
          null,
          StoreResponseErrorEnum.STORE_NOT_FOUND,
          HTTPStatusEnum.BAD_REQUEST,
        );
        return {
          data: null,
          error: StoreResponseErrorEnum.STORE_NOT_FOUND,
          status: HTTPStatusEnum.BAD_REQUEST,
        };
      }
      const resp = buildResponse(store, null, HTTPStatusEnum.OK);
      return { data: store, error: null, status: HTTPStatusEnum.OK };
    } catch (e) {
      return {
        data: null,
        error: HTTPErrorMessage.SERVER_ERROR,
        status: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
      };
    }
  },
);

export const getStoreStoreFirst = async (): Promise<
  ResponseDataAction<IStore>
> => {
  try {
    const userResponse = await getUser();
    if (!userResponse.data || userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return {
        data: null,
        error,
        status,
      };
    }

    const userId = userResponse.data.id;
    const store = await storeRepo.getStoreFirst(userId);
    if (!store) {
      return {
        data: null,
        error: StoreResponseErrorEnum.STORE_LIST_NOT_FOUND,
        status: HTTPStatusEnum.BAD_REQUEST,
      };
    }
    return { data: store, error: null, status: HTTPStatusEnum.OK };
  } catch (e) {
    return {
      data: null,
      error: HTTPErrorMessage.SERVER_ERROR,
      status: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getStoreListByUserId = async (
  userId: string,
): Promise<ResponseDataAction<IStore[]>> => {
  try {
    const storeList = await storeRepo.getStoreList(userId);
    if (!storeList) {
      return {
        data: null,
        error: StoreResponseErrorEnum.STORE_LIST_NOT_FOUND,
        status: HTTPStatusEnum.BAD_REQUEST,
      };
    }
    return { data: storeList, error: null, status: HTTPStatusEnum.OK };
  } catch (e) {
    return {
      data: null,
      error: HTTPErrorMessage.SERVER_ERROR,
      status: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    };
  }
};

export const renameStore = async (
  data: IRenameStoreAction,
): Promise<ResponseDataAction<IStore>> => {
  const { currentStoreName, newStoreName } = data;
  try {
    const userResponse = await getUser();
    if (userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return {
        data: null,
        error,
        status,
      };
    }

    // Exist old store
    const isExistResponse = await isExist(currentStoreName);
    if (isExistResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isExistResponse;
      return {
        data: null,
        error,
        status,
      };
    }

    // Unique new store
    const isUniqueResponse = await isUnique(newStoreName);
    if (isUniqueResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isUniqueResponse;
      return {
        data: null,
        error,
        status,
      };
    }

    const newSlug = slugGenerator(newStoreName);
    const store = await storeRepo.renameStore({
      currentStoreName,
      newStoreName: newStoreName.trim(),
      newSlug,
      userId: userResponse.data?.id as string,
    });

    if (!store) {
      return {
        data: null,
        error: StoreResponseErrorEnum.STORE_NOT_UPDATED,
        status: HTTPStatusEnum.BAD_REQUEST,
      };
    }

    return { data: store, error: null, status: HTTPStatusEnum.OK };
  } catch (e) {
    return {
      data: null,
      error: HTTPErrorMessage.SERVER_ERROR,
      status: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    };
  }
};

export const removeStoreById = async (
  storeId: string,
): Promise<ResponseDataAction<IStore>> => {
  try {
    const userResponse = await getUser();
    if (!userResponse.data || userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return {
        data: null,
        error,
        status,
      };
    }

    const userId = userResponse.data.id;
    const isOwnerResponse = await isOwner({
      storeId,
      userId: userResponse.data.id,
    });
    if (isOwnerResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isOwnerResponse;
      return {
        data: null,
        error,
        status,
      };
    }

    const store = await storeRepo.removeStoreBy({ storeId, userId });

    if (!store) {
      return {
        data: null,
        error: StoreResponseErrorEnum.STORE_NOT_UPDATED,
        status: HTTPStatusEnum.BAD_REQUEST,
      };
    }
    return { data: store, error: null, status: HTTPStatusEnum.OK };
  } catch (e) {
    return {
      data: null,
      error: HTTPErrorMessage.SERVER_ERROR,
      status: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    };
  }
};
// const getUser = (): ResponseDataAction<userClerk> => {
//   const user = auth();
//   if (!user) {
//     return {
//       data: null,
//       error: StoreResponseErrorEnum.USER_NOT_FOUND,
//       status: HTTPStatusEnum.NOT_FOUND,
//     };
//   }
//   return {
//     data: user,
//     error: null,
//     status: HTTPStatusEnum.OK,
//   };
// };

const isUnique = async (
  storeName: string,
): Promise<ResponseDataAction<boolean>> => {
  const store = await storeRepo.getStoreByName(storeName);
  const response = { data: true, error: "", status: 200 };
  if (store) {
    response.data = false;
    response.error = StoreResponseErrorEnum.STORE_EXIST;
    response.status = 400;
  }
  return response;
};

const isUniqueById = async (
  storeId: string,
): Promise<ResponseDataAction<boolean>> => {
  const store = await storeRepo.getStoreById(storeId);
  const response = { data: true, error: "", status: 200 };
  if (store) {
    response.data = false;
    response.error = StoreResponseErrorEnum.STORE_EXIST;
    response.status = 400;
  }
  return response;
};

const isExist = async (
  storeName: string,
): Promise<ResponseDataAction<boolean>> => {
  const store = await storeRepo.getStoreByName(storeName);
  const response = { data: true, error: "", status: 200 };
  if (!store) {
    response.data = false;
    response.error = StoreResponseErrorEnum.STORE_EXIST;
    response.status = 400;
  }
  return response;
};

const isExistById = async (
  storeId: string,
): Promise<ResponseDataAction<boolean>> => {
  const store = await storeRepo.getStoreById(storeId);
  const response = { data: true, error: "", status: 200 };
  if (!store) {
    response.data = false;
    response.error = StoreResponseErrorEnum.STORE_EXIST;
    response.status = 400;
  }
  return response;
};

const isOwner = async (
  data: IIsOwnerAction,
): Promise<ResponseDataAction<boolean>> => {
  const store = await storeRepo.getStoreIsOwner(data);
  const response = { data: true, error: "", status: 200 };
  if (!store) {
    response.data = false;
    response.error = StoreResponseErrorEnum.STORE_EXIST;
    response.status = 400;
  }
  return response;
};
