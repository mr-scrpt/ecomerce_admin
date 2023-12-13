import { IUpdateBillboardPayload } from "./action.type";

export interface IUpdateBillboardRepo
  extends Omit<IUpdateBillboardPayload, "storeId"> {}
