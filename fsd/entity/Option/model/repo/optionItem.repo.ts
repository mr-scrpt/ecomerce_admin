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

  getOptionItemByName = async (
    data: IGetOptionItemByNameRepo,
  ): Promise<IOptionItem | null> => {
    try {
      return await prismaDB.optionItem.findUnique({
        where: { optionId_name: data },
      });
    } catch (e) {
      return null;
    }
  };

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
