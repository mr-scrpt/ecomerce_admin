import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { IOptionItem } from "../../type/entity.type";
import {
  ICreateOptionItemRepo,
  IGetOptionItemByNameRepo,
  IRemoveOptionItemByName,
  IUpdateOptionItemRepo,
} from "../../type/repo.type";

class OptionItemRepo {
  // getOptionItem = async (optionId: string): Promise<IOption | null> => {
  //   return await prismaDB.OptionItem.findUnique({
  //     include: { store: true },
  //     where: { id: OptionItemId },
  //   });
  // };
  //
  getOptionListItemList = cache(
    async (optionId: string): Promise<IOptionItem[]> => {
      const res = await prismaDB.optionItem.findMany({
        // include: { store: true },
        where: {
          optionId,
        },
      });
      return res;
    },
  );

  // getOptionItemListByStoreSlug = cache(
  //   async (storeSlug: string): Promise<IOptionItemWithRelations[]> => {
  //     const res = await prismaDB.OptionItem.findMany({
  //       include: { store: true },
  //       where: {
  //         store: {
  //           slug: storeSlug,
  //         },
  //       },
  //     });
  //     return res;
  //   },
  // );

  getOptionItemByName = async (
    data: IGetOptionItemByNameRepo,
  ): Promise<IOptionItem | null> => {
    //!! Not findUnique, becouse if not found throw error
    try {
      return await prismaDB.optionItem.findUnique({
        where: { optionId_name: data },
      });
    } catch (e) {
      return null;
    }
  };

  // getOptionItemBySlug = async (
  //   data: IGetOptionItemBySlugRepo,
  // ): Promise<IOptionItem | null> => {
  //   const { storeId, OptionItemSlug } = data;
  //   const res = await prismaDB.OptionItem.findUnique({
  //     include: { store: true },
  //     where: { storeId_slug: { storeId, slug: OptionItemSlug } },
  //   });
  //   return res;
  // };

  // getOptionItemIsOwner = cache(
  //   async (data: IIsOwnerRepo): Promise<IOptionItem | null> => {
  //     const { OptionItemId, userId } = data;
  //     return await prismaDB.OptionItem.findUnique({
  //       where: { id: OptionItemId, store: { userId } },
  //     });
  //   },
  // );
  //
  // getOptionItemByCategory = cache(
  //   async (categoryId: string): Promise<IOptionItem[]> => {
  //     return await prismaDB.OptionItem.findMany({
  //       where: { categoryList: { some: { id: categoryId } } },
  //     });
  //   },
  // );

  createOptionItem = async (
    data: ICreateOptionItemRepo,
  ): Promise<IOptionItem> => {
    const { name, value, slug, optionId } = data;
    const res = await prismaDB.optionItem.create({
      data: {
        name,
        optionId,
        value,
        slug,
      },
      // include: { option: true },
    });
    return res;
  };

  updateOptionItem = cache(
    async (data: IUpdateOptionItemRepo): Promise<IOptionItem> => {
      const { id, name, newSlug, value } = data;
      const option = await prismaDB.optionItem.update({
        where: {
          id,
        },
        data: {
          name,
          value,
          slug: newSlug,
        },
      });
      return option;
    },
  );

  removeOptionItem = cache(async (optionId: string): Promise<IOptionItem> => {
    return await prismaDB.optionItem.delete({
      where: {
        id: optionId,
      },
    });
  });

  removeOptionItemByOption = cache(async (optionId: string): Promise<void> => {
    await prismaDB.optionItem.deleteMany({
      where: {
        optionId,
      },
    });
  });

  removeOptionItemByName = cache(
    async (data: IRemoveOptionItemByName): Promise<IOptionItem> => {
      return await prismaDB.optionItem.delete({
        where: {
          optionId_name: data,
        },
      });
    },
  );
}

export const optionItemRepo = new OptionItemRepo();
