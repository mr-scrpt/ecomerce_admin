import {
  IGetBillboardPayload,
  IIsOwnerPayload,
  IIsUniqueBillboardPayload,
  IUpdateBillboardPayload,
} from "./action.type";

export interface IUpdateBillboardRepo
  extends Omit<IUpdateBillboardPayload, "storeId"> {}

export interface IRemoveBillboardRepo {
  billboardId: string;
  // storeId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface IGetBillboardByNameRepo extends IIsUniqueBillboardPayload {}
export interface IGetBillboardRepo extends IGetBillboardPayload {}
