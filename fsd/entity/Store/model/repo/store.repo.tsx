import prismaDB from "@/fsd/shared/lib/prismadb";
import { ICreateStoreAction, IGetStoreAction } from "../../type/action.type";
import { IStore } from "../../type/store.type";
import { IRenameStoreRepo } from "../../type/repo.type";

export const getStoreBySlugAndUserId = async (
  data: IGetStoreAction,
): Promise<IStore | null> => {
  const { slug, userId } = data;
  return await prismaDB.store.findUnique({
    where: {
      slug,
      userId,
    },
  });
};

export const getStoreList = async (userId: string): Promise<IStore[]> => {
  return await prismaDB.store.findMany({
    where: {
      userId,
    },
  });
};

export const getStoreByName = async (name: string): Promise<IStore | null> =>
  await prismaDB.store.findUnique({ where: { name } });

export const createStore = async (
  data: ICreateStoreAction,
): Promise<IStore> => {
  const { name, userId, slug } = data;
  const store = await prismaDB.store.create({
    data: {
      name,
      userId,
      slug,
    },
  });
  return store;
};

export const renameStore = async (data: IRenameStoreRepo): Promise<IStore> => {
  const { currentStoreName, newStoreName, newSlug, userId } = data;
  const store = await prismaDB.store.update({
    where: {
      name: currentStoreName,
      userId,
    },
    data: {
      name: newStoreName,
      slug: newSlug,
    },
  });
  return store;
};
