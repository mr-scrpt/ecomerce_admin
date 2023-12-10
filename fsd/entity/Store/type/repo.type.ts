import { IRenameStoreAction } from "./action.type";

export interface IRenameStoreRepo extends IRenameStoreAction {
  newSlug: string;
  userId: string;
}
