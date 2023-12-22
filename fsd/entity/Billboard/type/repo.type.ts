import {
  IGetBillboardByNamePayload,
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

export interface IGetBillboardRepo extends IGetBillboardPayload {}
export interface IGetBillboardByNameRepo extends IGetBillboardByNamePayload {}
