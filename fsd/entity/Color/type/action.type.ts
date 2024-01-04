export interface ICreateColorPayload {
  storeId: string;
  name: string;
  value: string;
}

export interface IUpdateColorPayload {
  storeId: string;
  colorId: string;
  name: string;
  value: string;
  // imgUrl: string;
}

export interface IGetColorPayload {
  colorId: string;
  storeId: string;
}

export interface IGetColorBySlugPayload {
  colorSlug: string;
  storeSlug: string;
}

export interface IGetColorByNamePayload {
  name: string;
  storeId: string;
}

export interface IIsOwnerPayload {
  colorId: string;
  userId: string;
}

export interface IIsUniqueColorPayload {
  name: string;
  // colorId: string;
  storeId: string;
}

export interface IIsCurrentColorPayload {
  name: string;
  colorId: string;
}

export interface IGetColorByBillboardPayload {
  // storeId: string;
  billboardId: string;
}
