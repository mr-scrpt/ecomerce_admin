export interface ICreateSizePayload {
  storeId: string;
  name: string;
  value: string;
}

export interface IUpdateSizePayload {
  storeId: string;
  sizeId: string;
  name: string;
  value: string;
  // imgUrl: string;
}

export interface IGetSizePayload {
  sizeId: string;
  storeId: string;
}

export interface IGetSizeBySlugPayload {
  sizeSlug: string;
  storeSlug: string;
}

export interface IGetSizeByNamePayload {
  name: string;
  storeId: string;
}

export interface IIsOwnerPayload {
  sizeId: string;
  userId: string;
}

export interface IIsUniqueSizePayload {
  name: string;
  // sizeId: string;
  storeId: string;
}

export interface IIsCurrentSizePayload {
  name: string;
  sizeId: string;
}

export interface IGetSizeByBillboardPayload {
  // storeId: string;
  billboardId: string;
}
