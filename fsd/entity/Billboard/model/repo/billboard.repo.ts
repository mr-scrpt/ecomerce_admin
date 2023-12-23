import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { ICreateBillboardPayload } from "../../type/action.type";
import { IBillboard } from "../../type/entity.type";
import {
  IGetBillboardByNameRepo,
  IGetBillboardRepo,
  IIsOwnerRepo,
  IRemoveBillboardRepo,
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

  getBillboard = async (billboardId: string): Promise<IBillboard | null> => {
    return await prismaDB.billboard.findUnique({
      where: { id: billboardId },
    });
  };

  getBillboardList = cache(async (storeId: string): Promise<IBillboard[]> => {
    return await prismaDB.billboard.findMany({
      where: {
        storeId: storeId,
      },
    });
  });

  getBillboardListByStoreSlug = cache(
    async (storeSlug: string): Promise<IBillboard[]> => {
      return await prismaDB.billboard.findMany({
        where: {
          store: {
            slug: storeSlug,
          },
        },
      });
    },
  );

  // getStoreFirst = cache(
  //   async (userId: string): Promise<IStore | null> =>
  //     await prismaDB.store.findFirst({ where: { userId } }),
  // );

  getBillboardByName = async (
    data: IGetBillboardByNameRepo,
  ): Promise<IBillboard | null> => {
    const res = await prismaDB.billboard.findUnique({
      where: { storeId_name: data },
    });
    return res;
  };

  getBillboardIsOwner = cache(
    async (data: IIsOwnerRepo): Promise<IBillboard | null> => {
      const { billboardId, userId } = data;
      console.log("in owner =>>>", { billboardId, userId });
      return await prismaDB.billboard.findUnique({
        where: { id: billboardId, store: { userId } },
      });
    },
  );

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

  removeBillboard = cache(
    async (data: IRemoveBillboardRepo): Promise<IBillboard> => {
      const { billboardId } = data;
      return await prismaDB.billboard.delete({
        where: {
          id: billboardId,
        },
      });
    },
  );
}

export const billboardRepo = new BillboardRepo();
