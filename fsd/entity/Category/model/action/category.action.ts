"use server";
import { billboardAction } from "@/fsd/entity/Billboard";
import { storeAction } from "@/fsd/entity/Store";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { checkAuthUser } from "@/fsd/shared/model";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import {
  IAddCategoryOptionPayload,
  ICreateCategoryPayload,
  IGetCategoryBySlugPayload,
  IIsCurrentCategoryPayload,
  IIsOwnerPayload,
  IIsUniqueCategoryPayload,
  IUpdateCategoryPayload,
} from "../../type/action.type";
import { ICategory, ICategoryWithRelations } from "../../type/entity.type";
import { categoryRepo } from "../repo/category.repo";
import { CategoryResponseErrorEnum } from "../repo/responseError.enum";

export const createCategory = cache(
  async (
    data: ICreateCategoryPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<ICategory | null>> => {
    try {
      const { storeId, name, optionListId } = data;

      await checkAuthUser(checkAuth);

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
        throw new HttpException(storeResponse.error);
      }

      const slug = slugGenerator(name);

      const category = await categoryRepo.createCategory({ ...data, slug });

      if (!category) {
        throw new HttpException(
          CategoryResponseErrorEnum.CATEGORY_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      if (optionListId) {
        await addOptionListToCategory({
          categoryId: category.id,
          optionListId,
        });
      }

      return buildResponse(category);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const addOptionListToCategory = cache(
  async (
    data: IAddCategoryOptionPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<null>> => {
    try {
      const { categoryId, optionListId } = data;
      await checkAuthUser(checkAuth);
      for await (const optionId of optionListId) {
        categoryRepo.addOptionListToCategory({
          optionId,
          categoryId,
        });
      }
      return buildResponse(null);
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

export const getCategoryBySlug = cache(
  async (
    data: IGetCategoryBySlugPayload,
  ): Promise<ResponseDataAction<ICategory | null>> => {
    try {
      const { storeSlug, categorySlug } = data;
      const storeResponse = await storeAction.getStoreBySlug(storeSlug);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const store = storeResponse.data;

      const category = await categoryRepo.getCategoryBySlug({
        categorySlug,
        storeId: store!.id,
      });

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

export const getCategoryListByBillboard = cache(
  async (
    billboardId: string,
  ): Promise<ResponseDataAction<ICategory[] | null>> => {
    try {
      const categoryList =
        await categoryRepo.getCategoryByBillboard(billboardId);
      return buildResponse(categoryList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const updateCategory = cache(
  async (
    data: IUpdateCategoryPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<ICategory | null>> => {
    try {
      await checkAuthUser(checkAuth);

      const { storeId, categoryId, name, billboardId } = data;

      const storeResponse = await storeAction.getStore(storeId);
      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const billboardResponse = await billboardAction.getBillboard(billboardId);
      if (billboardResponse.error) {
        throw new HttpException(billboardResponse.error);
      }

      const isExistResponse = await isExist(categoryId);

      if (!isExistResponse) {
        throw new HttpException(
          CategoryResponseErrorEnum.CATEGORY_NOT_EXIST,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const isCurrentResponse = await isCurrent({ name, categoryId });

      if (!isCurrentResponse) {
        const isUniqueResponse = await isUnique({ name, storeId });

        if (!isUniqueResponse) {
          throw new HttpException(
            CategoryResponseErrorEnum.CATEGORY_NOT_UNIQUE,
            HTTPStatusEnum.BAD_REQUEST,
          );
        }
      }

      const newSlug = slugGenerator(name);

      const category = await categoryRepo.updateCategory({
        categoryId,
        name,
        newSlug,
        billboardId,
      });

      if (!category) {
        throw new HttpException(
          CategoryResponseErrorEnum.CATEGORY_NOT_UPDATED,
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

export const removeCategory = cache(
  async (
    categoryId: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<ICategory | null>> => {
    try {
      const udata = await checkAuthUser(checkAuth);

      const category = await getCategory(categoryId);
      const { data } = category;

      if (!data) {
        throw new HttpException(
          CategoryResponseErrorEnum.CATEGORY_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const userId = udata!.id;
      const isOwnerResponse = await isOwner({
        categoryId: data.id,
        userId,
      });
      if (!isOwnerResponse) {
        throw new HttpException(
          CategoryResponseErrorEnum.CATEGORY_NO_OWNER,
          HTTPStatusEnum.FORBIDDEN,
        );
      }

      const categoryRemover = await categoryRepo.removeCategory({
        categoryId,
      });

      if (!categoryRemover) {
        throw new HttpException(
          CategoryResponseErrorEnum.CATEGORY_NOT_REMOVED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      return buildResponse(categoryRemover);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

const isUnique = async (data: IIsUniqueCategoryPayload): Promise<boolean> =>
  !(await categoryRepo.getCategoryByName(data));

const isCurrent = async (data: IIsCurrentCategoryPayload): Promise<boolean> => {
  const { name, categoryId } = data;
  const cat = await categoryRepo.getCategory(categoryId);
  const isCurrent = cat && cat.name === name;

  return !!isCurrent;
};

const isExist = cache(
  async (categoryId: string): Promise<boolean> =>
    !!(await categoryRepo.getCategory(categoryId)),
);

const isOwner = cache(
  async (data: IIsOwnerPayload): Promise<boolean> =>
    !!(await categoryRepo.getCategoryIsOwner(data)),
);
