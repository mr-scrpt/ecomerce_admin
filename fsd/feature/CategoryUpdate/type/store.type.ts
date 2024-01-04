import { ICategory, IGetCategoryBySlugPayload } from "@/fsd/entity/Category";

export interface IStoreCategoryUpdate {
  category: ICategory | null;
  error: string | null;
  loading: boolean;
  resetCategory: () => void;
  getCategoryCurrent: (payload: IGetCategoryBySlugPayload) => void;
}
