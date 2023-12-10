import { IIsOwnerAction, IRenameStoreAction } from "./action.type";

export interface IRenameStoreRepo extends IRenameStoreAction {
  newSlug: string;
  userId: string;
}

export interface IRemoveStoreRepo {
  storeId: string;
  userId: string;
}

export interface IIsOwnerRepo extends IIsOwnerAction {}
