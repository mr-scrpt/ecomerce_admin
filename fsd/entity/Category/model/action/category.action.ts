"use server";
import { storeAction } from "@/fsd/entity/Store";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { authAction } from "@/fsd/shared/modle/action";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import {
  ICreateCategoryPayload,
  IIsOwnerPayload,
  IIsUniqueCategoryPayload,
  IUpdateCategoryPayload,
} from "../../type/action.type";
import { categoryRepo } from "../repo/category.repo";
import { CategoryResponseErrorEnum } from "../repo/responseError.enum";
import { ICategory, ICategoryWithRelations } from "../../type/entity.type";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";

export const createCategory = cache(
  async (
    data: ICreateCategoryPayload,
  ): Promise<ResponseDataAction<ICategory | null>> => {
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
          CategoryResponseErrorEnum.CATEGORY_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const storeResponse = await storeAction.getStore(storeId);
      if (storeResponse.error) {
        throw new Error(storeResponse.error);
      }

      const slug = slugGenerator(name);

      const category = await categoryRepo.createCategory({ ...data, slug });

      if (!category) {
        throw new HttpException(
          CategoryResponseErrorEnum.CATEGORY_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(category);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getCategory = cache(
  async (categoryId: string): Promise<ResponseDataAction<ICategory | null>> => {
    try {
      const category = await categoryRepo.getCategory(categoryId);
      if (!category) {
        throw new HttpException(
          CategoryResponseErrorEnum.CATEGORY_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }
      return buildResponse(category);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getCategoryListByStoreId = cache(
  async (storeId: string): Promise<ResponseDataAction<ICategory[] | null>> => {
    try {
      const categoryList = await categoryRepo.getCategoryList(storeId);
      return buildResponse(categoryList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getCategoryListByStoreSlug = cache(
  async (
    storeSlug: string,
  ): Promise<ResponseDataAction<ICategoryWithRelations[] | null>> => {
    try {
      const categoryList =
        await categoryRepo.getCategoryListByStoreSlug(storeSlug);
      return buildResponse(categoryList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

// export const updateCategory = cache(
//   async (
//     data: IUpdateCategoryPayload,
//   ): Promise<ResponseDataAction<ICategory | null>> => {
//     try {
//       const { error, status } = await authAction.getAuthUser();
//       if (error) {
//         throw new HttpException(error, status);
//       }
//
//       const { storeId, categoryId, name, imgUrl } = data;
//
//       const storeResponse = await storeAction.getStore(storeId);
//       if (storeResponse.error) {
//         throw new Error(storeResponse.error);
//       }
//
//       const isExistResponse = await isExist(categoryId);
//
//       if (!isExistResponse) {
//         throw new HttpException(
//           CategoryResponseErrorEnum.CATEGORY_NOT_EXIST,
//           HTTPStatusEnum.NOT_FOUND,
//         );
//       }
//
//       const isUniqueResponse = await isUnique({ name, storeId });
//       if (!isUniqueResponse) {
//         throw new HttpException(
//           CategoryResponseErrorEnum.CATEGORY_NOT_UNIQUE,
//           HTTPStatusEnum.BAD_REQUEST,
//         );
//       }
//
//       const category = await categoryRepo.updateCategory({
//         categoryId,
//         name,
//         imgUrl,
//       });
//       if (!category) {
//         throw new HttpException(
//           CategoryResponseErrorEnum.CATEGORY_NOT_UPDATED,
//           HTTPStatusEnum.BAD_REQUEST,
//         );
//       }
//       return buildResponse(category);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

// export const removeCategory = cache(
//   async (categoryId: string): Promise<ResponseDataAction<ICategory | null>> => {
//     try {
//       const { error, status, data: udata } = await authAction.getAuthUser();
//       if (error) {
//         throw new HttpException(error, status);
//       }
//
//       const category = await getCategory(categoryId);
//       const { data } = category;
//
//       if (!data) {
//         throw new HttpException(
//           CategoryResponseErrorEnum.CATEGORY_NOT_FOUND,
//           HTTPStatusEnum.NOT_FOUND,
//         );
//       }
//
//       const userId = udata!.id;
//       const isOwnerResponse = await isOwner({
//         categoryId: data.id,
//         userId,
//       });
//       if (!isOwnerResponse) {
//         throw new HttpException(
//           CategoryResponseErrorEnum.CATEGORY_NO_OWNER,
//           HTTPStatusEnum.FORBIDDEN,
//         );
//       }
//       const categoryRemover = await categoryRepo.removeCategory({
//         categoryId,
//       });
//
//       if (!categoryRemover) {
//         throw new HttpException(
//           CategoryResponseErrorEnum.CATEGORY_NOT_REMOVED,
//           HTTPStatusEnum.BAD_REQUEST,
//         );
//       }
//
//       return buildResponse(categoryRemover);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

const isUnique = async (data: IIsUniqueCategoryPayload): Promise<boolean> =>
  !(await categoryRepo.getCategoryByName(data));

const isExist = cache(
  async (categoryId: string): Promise<boolean> =>
    !!(await categoryRepo.getCategory(categoryId)),
);

const isOwner = cache(
  async (data: IIsOwnerPayload): Promise<boolean> =>
    !!(await categoryRepo.getCategoryIsOwner(data)),
);
