import {
  ICreateColorPayload,
  IGetColorByNamePayload,
  IGetColorPayload,
  IIsOwnerPayload,
  IUpdateColorPayload,
} from "./action.type";

export interface IUpdateColorRepo extends Omit<IUpdateColorPayload, "storeId"> {
  newSlug: string;
}

export interface IRemoveColorRepo {
  colorId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface ICreateColorRepo extends ICreateColorPayload {
  slug: string;
}
export interface IGetColorRepo extends IGetColorPayload {}
export interface IGetColorByNameRepo extends IGetColorByNamePayload {}

// export interface IGetColorByBillboardRepo
//   extends IGetColorByBillboardPayload {}
