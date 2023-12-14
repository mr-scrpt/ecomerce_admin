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

export interface IIsUniqueBilboard {
  billboardName: string;
  storeId: string;
}
