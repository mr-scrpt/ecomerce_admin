export interface ICreateCategoryPayload {
  storeId: string;
  name: string;
  billboardId: string;
}

export interface IUpdateCategoryPayload {
  storeId: string;
  categoryId: string;
  name: string;
  // imgUrl: string;
}

export interface IGetCategoryPayload {
  categoryId: string;
  storeId: string;
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
  storeId: string;
}