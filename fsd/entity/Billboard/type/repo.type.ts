import {
  ICreateBillboardPayload,
  IGetBillboardByNamePayload,
  IGetBillboardPayload,
  IIsOwnerPayload,
  IUpdateBillboardPayload,
} from "./action.type";

export interface ICreateBillboardRepo extends ICreateBillboardPayload {
  slug: string;
}

export interface IUpdateBillboardRepo
  extends Omit<IUpdateBillboardPayload, "storeId"> {
  newSlug: string;
}

export interface IRemoveBillboardRepo {
  billboardId: string;
  // storeId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface IGetBillboardRepo extends IGetBillboardPayload {}
export interface IGetBillboardByNameRepo extends IGetBillboardByNamePayload {}
export interface IGetBillboardBySlugRepo {
  billboardSlug: string;
  storeId: string;
}
