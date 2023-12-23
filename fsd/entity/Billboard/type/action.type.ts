export interface ICreateBillboardPayload {
  storeId: string;
  name: string;
  imgUrl: string;
}

export interface IUpdateBillboardPayload {
  storeId: string;
  billboardId: string;
  name: string;
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

export interface IIsOwnerPayload {
  billboardId: string;
  userId: string;
}

export interface IIsUniqueBillboardPayload {
  name: string;
  storeId: string;
}
