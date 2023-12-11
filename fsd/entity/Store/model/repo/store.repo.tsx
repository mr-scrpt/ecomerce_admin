import prismaDB from "@/fsd/shared/lib/driverDB";
import { ICreateStoreAction, IGetStoreAction } from "../../type/action.type";
import { IStore } from "../../type/store.type";
import {
  IIsOwnerRepo,
  IRemoveStoreRepo,
  IRenameStoreRepo,
} from "../../type/repo.type";

class StoreRepo {
  async getStoreList(userId: string): Promise<IStore[]> {
    return await prismaDB.store.findMany({
      where: {
        userId,
      },
    });
  }

  async getStoreByName(name: string): Promise<IStore | null> {
    return await prismaDB.store.findUnique({ where: { name } });
  }

  async getStoreFirst(userId: string): Promise<IStore | null> {
    return await prismaDB.store.findFirst({ where: { userId } });
  }

  async getStoreById(id: string): Promise<IStore | null> {
    return await prismaDB.store.findUnique({ where: { id } });
  }

  async getStoreIsOwner(data: IIsOwnerRepo): Promise<IStore | null> {
    const { storeId, userId } = data;
    return await prismaDB.store.findUnique({ where: { id: storeId, userId } });
  }
  async createStore(data: ICreateStoreAction): Promise<IStore> {
    const { name, userId, slug } = data;
    const store = await prismaDB.store.create({
      data: {
        name,
        userId,
        slug,
      },
    });
    return store;
  }

  async renameStore(data: IRenameStoreRepo): Promise<IStore> {
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
  }

  async removeStoreBy(data: IRemoveStoreRepo): Promise<IStore> {
    const { storeId, userId } = data;
    return await prismaDB.store.delete({
      where: {
        id: storeId,
        userId,
      },
    });
  }
}

export const storeRepo = new StoreRepo();

// export const getStoreBySlugAndUserId = async (
//   data: IGetStoreAction,
// ): Promise<IStore | null> => {
//   const { slug, userId } = data;
//   return await prismaDB.store.findUnique({
//     where: {
//       slug,
//       userId,
//     },
//   });
// };

// export const getStoreList = async (userId: string): Promise<IStore[]> => {
//   return await prismaDB.store.findMany({
//     where: {
//       userId,
//     },
//   });
// };
//
// export const getStoreByName = async (name: string): Promise<IStore | null> =>
//   await prismaDB.store.findUnique({ where: { name } });
//
// export const getStoreFirst = async (userId: string): Promise<IStore | null> =>
//   await prismaDB.store.findFirst({ where: { userId } });
//
// export const getStoreById = async (id: string): Promise<IStore | null> =>
//   await prismaDB.store.findUnique({ where: { id } });
//
// export const getStoreIsOwner = async (
//   data: IIsOwnerRepo,
// ): Promise<IStore | null> => {
//   const { storeId, userId } = data;
//   return await prismaDB.store.findUnique({ where: { id: storeId, userId } });
// };
// export const createStore = async (
//   data: ICreateStoreAction,
// ): Promise<IStore> => {
//   const { name, userId, slug } = data;
//   const store = await prismaDB.store.create({
//     data: {
//       name,
//       userId,
//       slug,
//     },
//   });
//   return store;
// };
//
// export const renameStore = async (data: IRenameStoreRepo): Promise<IStore> => {
//   const { currentStoreName, newStoreName, newSlug, userId } = data;
//   const store = await prismaDB.store.update({
//     where: {
//       name: currentStoreName,
//       userId,
//     },
//     data: {
//       name: newStoreName,
//       slug: newSlug,
//     },
//   });
//   return store;
// };
//
// export const removeStoreBy = async (
//   data: IRemoveStoreRepo,
// ): Promise<IStore> => {
//   const { storeId, userId } = data;
//   return await prismaDB.store.delete({
//     where: {
//       id: storeId,
//       userId,
//     },
//   });
// };
