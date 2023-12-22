import { IStore } from "./entity.type";

export interface IStoreListStore {
  storeList: IStore[];
  loading: boolean;
  error: string | null;

  setStoreListByUser: (userId: string) => void;
}

export interface IStoreStore {
  storeCurrent: IStore | null;
  loading: boolean;
  error: string | null;

  setStoreBySlug: (slug: string) => void;
  // updateStoreData: (newStoreName: string) => void;
}
