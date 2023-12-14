import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { ICreateBillboardPayload } from "../../type/action.type";
import { IBillboard } from "../../type/entity.type";
import {
  IGetBillboardByNameRepo,
  IGetBillboardRepo,
  IUpdateBillboardRepo,
} from "../../type/repo.type";

class BillboardRepo {
  // getStoreBySlugAndUserId = cache(
  //   async (data: IGetStorePayload): Promise<IStore | null> => {
  //     const { slug, userId } = data;
  //     return await prismaDB.store.findUnique({
  //       where: {
  //         slug,
  //         userId,
  //       },
  //     });
  //   },
  // );
  //
  getBillboardList = cache(async (storeId: string): Promise<IBillboard[]> => {
    return await prismaDB.billboard.findMany({
      where: {
        storeId: storeId,
      },
    });
  });

  getBillboard = async (billboardId: string): Promise<IBillboard | null> => {
    return await prismaDB.billboard.findUnique({
      where: { id: billboardId },
    });
  };

  // getStoreFirst = cache(
  //   async (userId: string): Promise<IStore | null> =>
  //     await prismaDB.store.findFirst({ where: { userId } }),
  // );

  getBillboardByName = async (
    data: IGetBillboardRepo,
  ): Promise<IBillboard | null> =>
    await prismaDB.billboard.findUnique({ where: { storeId_name: data } });
  //
  // getStoreIsOwner = cache(
  //   async (data: IIsOwnerRepo): Promise<IStore | null> => {
  //     const { storeId, userId } = data;
  //     return await prismaDB.store.findUnique({
  //       where: { id: storeId, userId },
  //     });
  //   },
  // );
  //
  createBillboard = async (
    data: ICreateBillboardPayload,
  ): Promise<IBillboard> => {
    const { name, imgUrl, storeId } = data;
    return await prismaDB.billboard.create({
      data: {
        name,
        imgUrl,
        storeId,
      },
    });
  };

  updateBillboard = cache(
    async (data: IUpdateBillboardRepo): Promise<IBillboard> => {
      const { billboardId, name, imgUrl } = data;
      const store = await prismaDB.billboard.update({
        where: {
          id: billboardId,
        },
        data: {
          name,
          imgUrl,
        },
      });
      return store;
    },
  );
  //
  // removeStoreBy = cache(async (data: IRemoveStoreRepo): Promise<IStore> => {
  //   const { storeId, userId } = data;
  //   return await prismaDB.store.delete({
  //     where: {
  //       id: storeId,
  //       userId,
  //     },
  //   });
  // });
}

export const billboardRepo = new BillboardRepo();
