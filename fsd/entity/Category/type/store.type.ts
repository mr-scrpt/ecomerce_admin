import { ICategory } from "../../Category";

export interface IStoreCategoryRemove {
  categoryId: string;
  setId: (categoryId: string) => void;
  resetId: () => void;
}

export interface IStoreCategoryUpdate {
  categoryId: string;
  category: ICategory | null;
  error: string | null;
  loading: boolean;
  setId: (categoryId: string) => void;
  resetId: () => void;
  resetCategory: () => void;
  getCategoryCurrent: () => void;
}
