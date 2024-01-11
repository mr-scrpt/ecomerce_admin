import {
  ICreateCategoryPayload,
  IGetCategoryByNamePayload,
  IGetCategoryPayload,
  IIsOwnerPayload,
  IUpdateCategoryPayload,
} from "./action.type";

export interface IUpdateCategoryRepo
  extends Omit<IUpdateCategoryPayload, "storeId"> {
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

export interface IGetCategoryRepo extends IGetCategoryPayload {}
export interface IGetCategoryByNameRepo extends IGetCategoryByNamePayload {}

export interface IGetCategoryBySlugRepo {
  categorySlug: string;
  storeId: string;
}

// export interface IGetCategoryByBillboardRepo
//   extends IGetCategoryByBillboardPayload {}
