import prismaDB from "@/fsd/shared/lib/prismadb";
import { IStore } from "../../type/store.type";

export const getStoreBySlugAndUserId = async (
  slug: string,
): Promise<IStore | null> => {
  return await prismaDB.store.findUnique({
    where: {
      slug,
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
export const getStoreBySlug = async () => {};
