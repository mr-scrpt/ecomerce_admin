import { Store } from "@prisma/client";

export interface IStore extends Store {}

export interface IStoreList {
  storeList: IStore[];
  storeCurrent: IStore | null;

  setStoreBySlug: (slug: string) => void;
  fetchStoreListByUser: (userId: string) => void;
}
