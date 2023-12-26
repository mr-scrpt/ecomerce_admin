export interface IGetStorePayload {
  slug: string;
  userId: string;
}

export interface ICreateStorePayload {
  name: string;
  userId: string;
  slug: string;
}

export interface IRenameStorePayload {
  currentStoreName: string;
  newStoreName: string;
}

export interface IIsOwnerPayload {
  storeId: string;
  userId: string;
}

export interface IIsUniqueStorePayload {
  name: string;
  userId: string;
}
