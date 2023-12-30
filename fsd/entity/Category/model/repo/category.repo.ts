import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { ICategory, ICategoryWithRelations } from "../../type/entity.type";
import {
  ICreateCategoryRepo,
  IGetCategoryByNameRepo,
  IIsOwnerRepo,
  IRemoveCategoryRepo,
  IUpdateCategoryRepo,
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
  //
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
