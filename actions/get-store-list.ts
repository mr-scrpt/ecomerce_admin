import prismaDB from "@/lib/prismadb";
import { Store } from "@prisma/client";

export const getStoreList = async (userId: string): Promise<Store[]> =>
  await prismaDB.store.findMany({
    where: {
      userId,
    },
  });
