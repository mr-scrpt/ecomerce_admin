import prismaDB from "@/fsd/shared/lib/driverDB";
import { cache } from "react";
import { ICreateBillboardPayload } from "../../type/action.type";
import { IBillboard } from "../../type/entity.type";
import {
  ICreateBillboardRepo,
  IGetBillboardByNameRepo,
  IGetBillboardBySlugRepo,
  IIsOwnerRepo,
  IRemoveBillboardRepo,
  IUpdateBillboardRepo,
} from "../../type/repo.type";

class BillboardRepo {
  getBillboard = async (billboardId: string): Promise<IBillboard | null> => {
    return await prismaDB.billboard.findUnique({
      where: { id: billboardId },
    });
  };

  getBillboardByName = async (
    data: IGetBillboardByNameRepo,
  ): Promise<IBillboard | null> => {
    const res = await prismaDB.billboard.findUnique({
      where: { storeId_name: data },
    });
    return res;
  };

  getBillboardBySlug = async (
    data: IGetBillboardBySlugRepo,
  ): Promise<IBillboard | null> => {
    const { storeId, billboardSlug } = data;
    const res = await prismaDB.billboard.findUnique({
      where: { storeId_slug: { slug: billboardSlug, storeId } },
    });
    return res;
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

  getBillboardIsOwner = cache(
    async (data: IIsOwnerRepo): Promise<IBillboard | null> => {
      const { billboardId, userId } = data;
      return await prismaDB.billboard.findUnique({
        where: { id: billboardId, store: { userId } },
      });
    },
  );

  createBillboard = async (data: ICreateBillboardRepo): Promise<IBillboard> => {
    const { name, imgUrl, storeId, slug } = data;
    return await prismaDB.billboard.create({
      data: {
        name,
        slug,
        imgUrl,
        storeId,
      },
    });
  };

  updateBillboard = cache(
    async (data: IUpdateBillboardRepo): Promise<IBillboard> => {
      const { billboardId, name, imgUrl, newSlug } = data;
      const store = await prismaDB.billboard.update({
        where: {
          id: billboardId,
        },
        data: {
          name,
          imgUrl,
          slug: newSlug,
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
