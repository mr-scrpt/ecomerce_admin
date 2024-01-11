import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { IOption, IOptionListWithRelations } from "../../type/entity.type";
import {
  ICreateOptionRepo,
  IGetOptionByNameRepo,
  IGetOptionBySlugRepo,
  IIsOwnerRepo,
  IRemoveOptionRepo,
  IUpdateOptionRepo,
} from "../../type/repo.type";
import { SelectDataTypeEnum } from "../../type/select.enum";
// import { IOptionWithRelations } from "../..";

class OptionRepo {
  getOption = async (optionId: string): Promise<IOption | null> => {
    return await prismaDB.option.findUnique({
      include: { store: true },
      where: { id: optionId },
    });
  };

  getOptionListByStoreId = cache(
    async (storeId: string): Promise<IOption[]> => {
      return await prismaDB.option.findMany({
        include: { store: true },
        where: {
          storeId: storeId,
        },
      });
    },
  );

  getOptionListByStoreSlug = cache(
    async (storeSlug: string): Promise<IOption[]> => {
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

  getOptionListByCategoryId = cache(
    async (categoryId: string): Promise<IOption[]> => {
      const res = await prismaDB.category.findUnique({
        where: { id: categoryId },
        include: { Option: true },
      });
      return res?.Option || [];
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

  getOptionBySlug = async (
    data: IGetOptionBySlugRepo,
  ): Promise<IOptionListWithRelations | null> => {
    const { storeId, optionSlug } = data;
    const res = await prismaDB.option.findUnique({
      include: { store: true, value: true },
      where: { storeId_slug: { storeId, slug: optionSlug } },
    });

    if (res) {
      const datatype = res.datatype as SelectDataTypeEnum;
      const obj = { ...res, datatype };
      obj.datatype;

      return obj;
    }
    return null;
  };

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
  updateOption = cache(async (data: IUpdateOptionRepo): Promise<IOption> => {
    const { optionId, name, datatype, newSlug } = data;
    const store = await prismaDB.option.update({
      where: {
        id: optionId,
      },
      data: {
        name,
        slug: newSlug,
        datatype,
      },
    });
    return store;
  });

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
