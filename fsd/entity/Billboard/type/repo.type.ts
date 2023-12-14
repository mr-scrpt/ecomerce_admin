import {
  IIsUniqueBillboardPayload,
  IUpdateBillboardPayload,
} from "./action.type";

export interface IUpdateBillboardRepo
  extends Omit<IUpdateBillboardPayload, "storeId"> {}

export interface IGetBillboardByNameRepo extends IIsUniqueBillboardPayload {}
