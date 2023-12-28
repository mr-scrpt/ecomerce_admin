import { ICategory } from "@/fsd/entity/Category";

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
