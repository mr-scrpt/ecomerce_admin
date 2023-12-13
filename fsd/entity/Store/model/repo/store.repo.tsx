import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { ICreateStorePayload, IGetStorePayload } from "../../type/action.type";
import {
  IIsOwnerRepo,
  IRemoveStoreRepo,
  IRenameStoreRepo,
} from "../../type/repo.type";
import { IStore } from "../../type/entity.type";

class StoreRepo {
  getStoreBySlugAndUserId = cache(
    async (data: IGetStorePayload): Promise<IStore | null> => {
      const { slug, userId } = data;
      return await prismaDB.store.findUnique({
        where: {
          slug,
          userId,
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
    async (name: string): Promise<IStore | null> =>
      await prismaDB.store.findUnique({ where: { name } }),
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
        name: currentStoreName,
        userId,
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
