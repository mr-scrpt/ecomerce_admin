export interface ICreateBillboardPayload {
  storeId: string;
  name: string;
  imgUrl: string;
}

export interface IUpdateBillboardPayload {
  storeId: string;
  billboardId: string;
  name: string;
  // newSlug: string;
  imgUrl: string;
}

export interface IGetBillboardPayload {
  billboardId: string;
  storeId: string;
}

export interface IGetBillboardByNamePayload {
  name: string;
  storeId: string;
}

export interface IGetBillboardBySlugPayload {
  billboardSlug: string;
  storeSlug: string;
}

export interface IIsOwnerPayload {
  billboardId: string;
  userId: string;
}

export interface IIsUniqueBillboardPayload {
  name: string;
  storeId: string;
}

export interface IIsCurrentBillboardPayload {
  name: string;
  billboardId: string;
}

export interface IIsRelationCategory {
  billboardId: string;
  // storeId: string;
}
