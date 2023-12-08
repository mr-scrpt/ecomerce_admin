import prismaDB from "@/fsd/shared/lib/prismadb";
import { ICreateStore, IGetStore } from "../../type/action.type";
import { IStore } from "../../type/store.type";

export const getStoreBySlugAndUserId = async (
  data: IGetStore,
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

export const createStore = async (data: ICreateStore): Promise<IStore> => {
  const { name, userId, slug } = data;
  const store = await prismaDB.store.create({
    data: {
      name: "bbb",
      userId,
      slug,
    },
  });
  return store;
};
