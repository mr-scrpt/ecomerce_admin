import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { ICategory, ICategoryWithRelations } from "../../type/entity.type";
import {
  IAddOptionRepo,
  ICreateCategoryRepo,
  IGetCategoryByNameRepo,
  IGetCategoryBySlugRepo,
  IIsOwnerRepo,
  IRemoveCategoryRepo,
  IUpdateCategoryRepo,
  IUpdateOptionRepo,
} from "../../type/repo.type";

class CategoryRepo {
  getCategory = async (categoryId: string): Promise<ICategory | null> => {
    return await prismaDB.category.findUnique({
      include: { billboard: true },
      where: { id: categoryId },
    });
  };

  getCategoryList = cache(async (storeId: string): Promise<ICategory[]> => {
    return await prismaDB.category.findMany({
      include: { billboard: true },
      where: {
        storeId: storeId,
      },
    });
  });

  getCategoryListByStoreSlug = cache(
    async (storeSlug: string): Promise<ICategoryWithRelations[]> => {
      const res = await prismaDB.category.findMany({
        include: { billboard: true },
        where: {
          store: {
            slug: storeSlug,
          },
        },
      });
      return res;
    },
  );

  getCategoryByName = async (
    data: IGetCategoryByNameRepo,
  ): Promise<ICategory | null> => {
    const res = await prismaDB.category.findUnique({
      include: { billboard: true },
      where: { storeId_name: data },
    });
    return res;
  };

  getCategoryBySlug = async (
    data: IGetCategoryBySlugRepo,
  ): Promise<ICategory | null> => {
    const { categorySlug, storeId } = data;
    const res = await prismaDB.category.findUnique({
      include: { billboard: true },
      where: { storeId_slug: { slug: categorySlug, storeId } },
    });
    return res;
  };

  getCategoryIsOwner = cache(
    async (data: IIsOwnerRepo): Promise<ICategory | null> => {
      const { categoryId, userId } = data;
      return await prismaDB.category.findUnique({
        where: { id: categoryId, store: { userId } },
      });
    },
  );

  getCategoryByBillboard = cache(
    async (billboardId: string): Promise<ICategory[]> => {
      return await prismaDB.category.findMany({
        where: { billboardId },
      });
    },
  );

  createCategory = async (data: ICreateCategoryRepo): Promise<ICategory> => {
    const { name, billboardId, storeId, slug } = data;
    return await prismaDB.category.create({
      data: {
        name,
        billboardId,
        slug,
        storeId,
      },
      // include: { billboard: true },
    });
  };
  addOptionToCategory = async (data: IAddOptionRepo): Promise<void> => {
    await prismaDB.category.update({
      where: { id: data.categoryId },
      data: {
        Option: {
          connect: { id: data.optionId },
        },
      },
    });
  };

  deleteCategoryOptionList = cache(
    async (categoryId: string): Promise<ICategory> => {
      const category = await prismaDB.category.update({
        where: {
          id: categoryId,
        },
        data: {
          Option: {
            set: [],
          },
        },
      });
      return category;
    },
  );

  updateCategoryOptionList = cache(
    async (data: IUpdateOptionRepo): Promise<ICategory> => {
      const { categoryId, optionListId } = data;
      const category = await prismaDB.category.update({
        where: {
          id: categoryId,
        },
        data: {
          Option: {
            set: optionListId.map((item) => ({ id: item })),
          },
        },
      });
      return category;
    },
  );

  updateCategory = cache(
    async (data: IUpdateCategoryRepo): Promise<ICategory> => {
      const { categoryId, name, newSlug, billboardId } = data;
      const store = await prismaDB.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name,
          billboardId,
          slug: newSlug,
        },
      });
      return store;
    },
  );

  removeCategory = cache(
    async (data: IRemoveCategoryRepo): Promise<ICategory> => {
      const { categoryId } = data;
      return await prismaDB.category.delete({
        where: {
          id: categoryId,
        },
      });
    },
  );
}

export const categoryRepo = new CategoryRepo();
