import {
  ICreateCategoryPayload,
  IGetCategoryByNamePayload,
  IGetCategoryPayload,
  IIsOwnerPayload,
  IUpdateCategoryOptionPayload,
  IUpdateCategoryPayload,
} from "./action.type";

export interface IUpdateCategoryRepo
  extends Omit<IUpdateCategoryPayload, "storeId" | "optionListId"> {
  newSlug: string;
}

export interface IRemoveCategoryRepo {
  categoryId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface ICreateCategoryRepo extends ICreateCategoryPayload {
  slug: string;
}

export interface IAddOptionRepo {
  categoryId: string;
  optionId: string;
}
export interface IUpdateOptionRepo extends IUpdateCategoryOptionPayload {}

export interface IGetCategoryRepo extends IGetCategoryPayload {}
export interface IGetCategoryByNameRepo extends IGetCategoryByNamePayload {}

export interface IGetCategoryBySlugRepo {
  categorySlug: string;
  storeId: string;
}

// export interface IGetCategoryByBillboardRepo
//   extends IGetCategoryByBillboardPayload {}
