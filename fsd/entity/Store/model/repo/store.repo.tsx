import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { ICreateStorePayload, IGetStorePayload } from "../../type/action.type";
import {
  IGetStoreByNameRepo,
  IIsOwnerRepo,
  IRemoveStoreRepo,
  IRenameStoreRepo,
} from "../../type/repo.type";
import { IStore } from "../../type/entity.type";

class StoreRepo {
  getStoreBySlug = cache(
    async (data: IGetStorePayload): Promise<IStore | null> => {
      const { slug, userId } = data;
      return await prismaDB.store.findUnique({
        where: {
          userId_slug: {
            slug,
            userId,
          },
        },
      });
    },
  );

  getStoreList = cache(async (userId: string): Promise<IStore[]> => {
    return await prismaDB.store.findMany({
      where: {
        userId,
      },
    });
  });

  getStoreByName = cache(
    async (data: IGetStoreByNameRepo): Promise<IStore | null> => {
      const { storeName, userId } = data;
      const res = await prismaDB.store.findUnique({
        where: { userId_name: { name: storeName, userId } },
      });
      console.log(" =>>> RES", res);
      return res;
      // return await prismaDB.store.findUnique({
      //   where: { userId_name: { name: storeName, userId } },
      // });
    },
  );

  getStoreFirst = cache(
    async (userId: string): Promise<IStore | null> =>
      await prismaDB.store.findFirst({ where: { userId } }),
  );

  getStore = cache(
    async (id: string): Promise<IStore | null> =>
      await prismaDB.store.findUnique({ where: { id } }),
  );

  getStoreIsOwner = cache(
    async (data: IIsOwnerRepo): Promise<IStore | null> => {
      const { storeId, userId } = data;
      return await prismaDB.store.findUnique({
        where: { id: storeId, userId },
      });
    },
  );

  createStore = cache(async (data: ICreateStorePayload): Promise<IStore> => {
    const { name, userId, slug } = data;
    return await prismaDB.store.create({
      data: {
        name,
        userId,
        slug,
      },
    });
  });

  renameStore = cache(async (data: IRenameStoreRepo): Promise<IStore> => {
    const { currentStoreName, newStoreName, newSlug, userId } = data;
    return await prismaDB.store.update({
      where: {
        userId_name: {
          name: currentStoreName,
          userId,
        },
      },
      data: {
        name: newStoreName,
        slug: newSlug,
      },
    });
  });

  removeStoreBy = cache(async (data: IRemoveStoreRepo): Promise<IStore> => {
    const { storeId, userId } = data;
    return await prismaDB.store.delete({
      where: {
        id: storeId,
        userId,
      },
    });
  });
}

export const storeRepo = new StoreRepo();
