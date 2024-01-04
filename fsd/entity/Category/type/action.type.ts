export interface ICreateCategoryPayload {
  storeId: string;
  name: string;
  billboardId: string;
}

export interface IUpdateCategoryPayload {
  storeId: string;
  categoryId: string;
  name: string;
  billboardId: string;
  // imgUrl: string;
}

export interface IGetCategoryPayload {
  categoryId: string;
  storeId: string;
}

export interface IGetCategoryBySlugPayload {
  categorySlug: string;
  storeSlug: string;
}

export interface IGetCategoryByNamePayload {
  name: string;
  storeId: string;
}

export interface IIsOwnerPayload {
  categoryId: string;
  userId: string;
}

export interface IIsUniqueCategoryPayload {
  name: string;
  // categoryId: string;
  storeId: string;
}

export interface IIsCurrentCategoryPayload {
  name: string;
  categoryId: string;
}

export interface IGetCategoryByBillboardPayload {
  // storeId: string;
  billboardId: string;
}
