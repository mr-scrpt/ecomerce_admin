import { ICategory } from "../../Category";
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

// export interface IStoreCategoryUpdate {
//   categoryId: string;
//   category: ICategory | null;
//   error: string | null;
//   loading: boolean;
//   setId: (categoryId: string) => void;
//   resetId: () => void;
//   resetCategory: () => void;
//   getCategoryCurrent: () => void;
// }
