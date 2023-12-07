import { Store } from "@prisma/client";

export interface IStore extends Store {}

export interface IStoreList {
  storeList: IStore[];
  storeCurrent: IStore | null;

  setStoreCurrentBySlug: (slug: string) => void;
  setStoreListByUser: (userId: string) => void;
}
