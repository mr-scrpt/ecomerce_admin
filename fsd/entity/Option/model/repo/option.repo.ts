import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { IOption, IOptionWithRelations } from "../../type/entity.type";
import {
  ICreateOptionRepo,
  IGetOptionByNameRepo,
  IGetOptionBySlugRepo,
  IIsOwnerRepo,
  IRemoveOptionRepo,
  IUpdateOptionRepo,
} from "../../type/repo.type";

class OptionRepo {
  getOption = async (optionId: string): Promise<IOption | null> => {
    return await prismaDB.option.findUnique({
      include: { store: true },
      where: { id: optionId },
    });
  };

  getOptionList = cache(async (storeId: string): Promise<IOption[]> => {
    return await prismaDB.option.findMany({
      include: { store: true },
      where: {
        storeId: storeId,
      },
    });
  });

  getOptionListByStoreSlug = cache(
    async (storeSlug: string): Promise<IOptionWithRelations[]> => {
      const res = await prismaDB.option.findMany({
        include: { store: true, value: true },
        where: {
          store: {
            slug: storeSlug,
          },
        },
      });
      return res;
    },
  );

  getOptionByName = async (
    data: IGetOptionByNameRepo,
  ): Promise<IOption | null> => {
    const res = await prismaDB.option.findUnique({
      include: { store: true },
      where: { storeId_name: data },
    });
    return res;
  };

  // getOptionBySlug = async (
  //   data: IGetOptionBySlugRepo,
  // ): Promise<IOption | null> => {
  //   const { storeId, optionSlug } = data;
  //   const res = await prismaDB.option.findUnique({
  //     include: { store: true },
  //     where: { storeId_slug: { storeId, slug: optionSlug } },
  //   });
  //   return res;
  // };

  getOptionIsOwner = cache(
    async (data: IIsOwnerRepo): Promise<IOption | null> => {
      const { optionId, userId } = data;
      return await prismaDB.option.findUnique({
        where: { id: optionId, store: { userId } },
      });
    },
  );

  getOptionByCategory = cache(
    async (categoryId: string): Promise<IOption[]> => {
      return await prismaDB.option.findMany({
        where: { categoryList: { some: { id: categoryId } } },
      });
    },
  );

  createOption = async (data: ICreateOptionRepo): Promise<IOption> => {
    const { name, datatype, storeId, slug } = data;
    return await prismaDB.option.create({
      data: {
        name,
        slug,
        datatype,
        storeId,
      },
      // include: { store: true },
    });
  };
  //
  // updateOption = cache(async (data: IUpdateOptionRepo): Promise<IOption> => {
  //   const { optionId, name, newSlug, value } = data;
  //   const store = await prismaDB.option.update({
  //     where: {
  //       id: optionId,
  //     },
  //     data: {
  //       name,
  //       value,
  //       slug: newSlug,
  //     },
  //   });
  //   return store;
  // });

  removeOption = cache(async (data: IRemoveOptionRepo): Promise<IOption> => {
    const { optionId } = data;
    return await prismaDB.option.delete({
      where: {
        id: optionId,
      },
    });
  });
}

export const optionRepo = new OptionRepo();
