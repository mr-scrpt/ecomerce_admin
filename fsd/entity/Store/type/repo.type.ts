import { IIsOwnerPayload, IRenameStorePayload } from "./action.type";

export interface IRenameStoreRepo extends IRenameStorePayload {
  newSlug: string;
  userId: string;
}

export interface IRemoveStoreRepo {
  storeId: string;
  userId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface IGetStoreByNameRepo {
  name: string;
  userId: string;
}
