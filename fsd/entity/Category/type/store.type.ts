import { ICategoryWithRelations } from "./entity.type";

export interface IStoreCategoryList {
  categoryList: ICategoryWithRelations[];
  loading: boolean;
  error: string | null;
  fetchCategoryList: (storeId: string) => void;
}

export interface IStoreCategoryRemove {
  categoryId: string;
  setId: (categoryId: string) => void;
  resetId: () => void;
}
