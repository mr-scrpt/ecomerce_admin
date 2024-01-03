import {
  ICreateSizePayload,
  IGetSizeByNamePayload,
  IGetSizePayload,
  IIsOwnerPayload,
  IUpdateSizePayload,
} from "./action.type";

export interface IUpdateSizeRepo extends Omit<IUpdateSizePayload, "storeId"> {
  newSlug: string;
}

export interface IRemoveSizeRepo {
  sizeId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface ICreateSizeRepo extends ICreateSizePayload {
  slug: string;
}
export interface IGetSizeRepo extends IGetSizePayload {}
export interface IGetSizeByNameRepo extends IGetSizeByNamePayload {}

// export interface IGetSizeByBillboardRepo
//   extends IGetSizeByBillboardPayload {}
