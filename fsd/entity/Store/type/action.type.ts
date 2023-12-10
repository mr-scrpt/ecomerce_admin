export interface IGetStoreAction {
  slug: string;
  userId: string;
}

export interface ICreateStoreAction {
  name: string;
  slug: string;
  userId: string;
}

export interface IRenameStoreAction {
  currentStoreName: string;
  newStoreName: string;
}
