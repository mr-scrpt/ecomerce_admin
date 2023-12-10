"use server";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { getUser } from "@/fsd/shared/modle/action/auth.action";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { StoreResponseErrorEnum } from "../../type/responseError.enum";
import { IStore } from "../../type/store.type";
import { repo } from "../repo";
import { IRenameStoreAction } from "../../type/action.type";

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
    const store = await repo.createStore({
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

export const getStoreBySlug = async (
  slug?: string,
): Promise<ResponseDataAction<IStore | null>> => {
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
    if (!slug) {
      return {
        data: null,
        error: StoreResponseErrorEnum.STORE_SLUG_EMPTY,
        status: HTTPStatusEnum.BAD_REQUEST,
      };
    }
    const store = await repo.getStoreBySlugAndUserId({
      slug,
      userId: userResponse.data?.id as string,
    });
    if (!store) {
      return {
        data: null,
        error: StoreResponseErrorEnum.STORE_NOT_FOUND,
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
    const storeList = await repo.getStoreList(userId);
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
    // console.log(" =>>>renameStore", storeName);
    const userResponse = await getUser();
    if (userResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = userResponse;
      return {
        data: null,
        error,
        status,
      };
    }

    const isExistResponse = await isExist(currentStoreName);
    if (isExistResponse.status !== HTTPStatusEnum.OK) {
      const { error, status } = isExistResponse;
      return {
        data: null,
        error,
        status,
      };
    }

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
    const store = await repo.renameStore({
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
  const store = await repo.getStoreByName(storeName);
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
  const store = await repo.getStoreByName(storeName);
  const response = { data: true, error: "", status: 200 };
  if (!store) {
    response.data = false;
    response.error = StoreResponseErrorEnum.STORE_EXIST;
    response.status = 400;
  }
  return response;
};
