import {
  ICreateCategoryPayload,
  IGetCategoryByBillboardPayload,
  IGetCategoryByNamePayload,
  IGetCategoryPayload,
  IIsOwnerPayload,
  IUpdateCategoryPayload,
} from "./action.type";

export interface IUpdateCategoryRepo
  extends Omit<IUpdateCategoryPayload, "storeId"> {}

export interface IRemoveCategoryRepo {
  billboardId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface ICreateCategoryRepo extends ICreateCategoryPayload {
  slug: string;
}
export interface IGetCategoryRepo extends IGetCategoryPayload {}
export interface IGetCategoryByNameRepo extends IGetCategoryByNamePayload {}

export interface IGetCategoryByBillboardRepo
  extends IGetCategoryByBillboardPayload {}
