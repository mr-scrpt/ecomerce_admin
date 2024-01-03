import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { ISize, ISizeWithRelations } from "../../type/entity.type";
import {
  ICreateSizeRepo,
  IGetSizeByNameRepo,
  IIsOwnerRepo,
  IRemoveSizeRepo,
  IUpdateSizeRepo,
} from "../../type/repo.type";

class SizeRepo {
  getSize = async (sizeId: string): Promise<ISize | null> => {
    return await prismaDB.size.findUnique({
      include: { store: true },
      where: { id: sizeId },
    });
  };

  getSizeList = cache(async (storeId: string): Promise<ISize[]> => {
    return await prismaDB.size.findMany({
      include: { store: true },
      where: {
        storeId: storeId,
      },
    });
  });

  getSizeListByStoreSlug = cache(
    async (storeSlug: string): Promise<ISizeWithRelations[]> => {
      const res = await prismaDB.size.findMany({
        include: { store: true },
        where: {
          store: {
            slug: storeSlug,
          },
        },
      });
      return res;
    },
  );

  getSizeByName = async (data: IGetSizeByNameRepo): Promise<ISize | null> => {
    const res = await prismaDB.size.findUnique({
      include: { store: true },
      where: { storeId_name: data },
    });
    return res;
  };

  getSizeIsOwner = cache(async (data: IIsOwnerRepo): Promise<ISize | null> => {
    const { sizeId, userId } = data;
    return await prismaDB.size.findUnique({
      where: { id: sizeId, store: { userId } },
    });
  });

  getSizeByCategory = cache(async (categoryId: string): Promise<ISize[]> => {
    return await prismaDB.size.findMany({
      where: { categoryList: { some: { id: categoryId } } },
    });
  });

  createSize = async (data: ICreateSizeRepo): Promise<ISize> => {
    const { name, value, storeId, slug } = data;
    return await prismaDB.size.create({
      data: {
        name,
        value,
        slug,
        storeId,
      },
      // include: { store: true },
    });
  };
  //
  updateSize = cache(async (data: IUpdateSizeRepo): Promise<ISize> => {
    const { sizeId, name, newSlug, value } = data;
    const store = await prismaDB.size.update({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
        slug: newSlug,
      },
    });
    return store;
  });

  removeSize = cache(async (data: IRemoveSizeRepo): Promise<ISize> => {
    const { sizeId } = data;
    return await prismaDB.size.delete({
      where: {
        id: sizeId,
      },
    });
  });
}

export const sizeRepo = new SizeRepo();
