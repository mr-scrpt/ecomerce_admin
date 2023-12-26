export interface IStoreCategoryTableItem {
  id: string;
  name: string;
  billboardName: string;

  // imgUrl: string[];
  createdAt: string;
}
export interface IStoreCategoryTable {
  list: IStoreCategoryTableItem[];
  loading: boolean;
  error: string | null;
  fetchCategoryListByStoreSlug: (storeSlug: string) => void;
}
