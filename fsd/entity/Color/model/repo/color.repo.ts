import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { IColor, IColorWithRelations } from "../../type/entity.type";
import {
  ICreateColorRepo,
  IGetColorByNameRepo,
  IIsOwnerRepo,
  IRemoveColorRepo,
  IUpdateColorRepo,
} from "../../type/repo.type";

class ColorRepo {
  getColor = async (colorId: string): Promise<IColor | null> => {
    return await prismaDB.color.findUnique({
      include: { store: true },
      where: { id: colorId },
    });
  };

  getColorList = cache(async (storeId: string): Promise<IColor[]> => {
    return await prismaDB.color.findMany({
      include: { store: true },
      where: {
        storeId: storeId,
      },
    });
  });

  getColorListByStoreSlug = cache(
    async (storeSlug: string): Promise<IColorWithRelations[]> => {
      const res = await prismaDB.color.findMany({
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

  getColorByName = async (
    data: IGetColorByNameRepo,
  ): Promise<IColor | null> => {
    const res = await prismaDB.color.findUnique({
      include: { store: true },
      where: { storeId_name: data },
    });
    return res;
  };

  getColorIsOwner = cache(
    async (data: IIsOwnerRepo): Promise<IColor | null> => {
      const { colorId, userId } = data;
      return await prismaDB.color.findUnique({
        where: { id: colorId, store: { userId } },
      });
    },
  );

  getColorByCategory = cache(async (categoryId: string): Promise<IColor[]> => {
    return await prismaDB.color.findMany({
      where: { categoryList: { some: { id: categoryId } } },
    });
  });

  createColor = async (data: ICreateColorRepo): Promise<IColor> => {
    const { name, value, storeId, slug } = data;
    return await prismaDB.color.create({
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
  updateColor = cache(async (data: IUpdateColorRepo): Promise<IColor> => {
    const { colorId, name, newSlug, value } = data;
    const store = await prismaDB.color.update({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
        slug: newSlug,
      },
    });
    return store;
  });

  removeColor = cache(async (data: IRemoveColorRepo): Promise<IColor> => {
    const { colorId } = data;
    return await prismaDB.color.delete({
      where: {
        id: colorId,
      },
    });
  });
}

export const colorRepo = new ColorRepo();
