import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import {
  ICreateCategoryRepo,
  IGetCategoryByNameRepo,
  IIsOwnerRepo,
  IRemoveCategoryRepo,
  IUpdateCategoryRepo,
} from "../../type/repo.type";
import { ICategory, ICategoryWithRelations } from "../../type/entity.type";
import { ICreateCategoryPayload } from "../../type/action.type";

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
      return await prismaDB.category.findMany({
        include: { billboard: true },
        where: {
          store: {
            slug: storeSlug,
          },
        },
      });
    },
  );

  getCategoryByName = async (
    data: IGetCategoryByNameRepo,
  ): Promise<ICategory | null> => {
    console.log("before =>>>", data);
    const res = await prismaDB.category.findUnique({
      // include: { billboard: true },
      where: { storeId_name: data },
    });
    console.log(" =>>>", res);
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
  //   updateCategory = cache(
  //     async (data: IUpdateCategoryRepo): Promise<ICategory> => {
  //       const { categoryId, name, imgUrl } = data;
  //       const store = await prismaDB.category.update({
  //         where: {
  //           id: categoryId,
  //         },
  //         data: {
  //           name,
  //           imgUrl,
  //         },
  //       });
  //       return store;
  //     },
  //   );
  //
  //   removeCategory = cache(
  //     async (data: IRemoveCategoryRepo): Promise<ICategory> => {
  //       const { categoryId } = data;
  //       return await prismaDB.category.delete({
  //         where: {
  //           id: categoryId,
  //         },
  //       });
  //     },
  //   );
}

export const categoryRepo = new CategoryRepo();
