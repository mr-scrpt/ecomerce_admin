export interface IStoreSizeTableItem {
  id: string;
  name: string;
  value: string;
  slug: string;

  createdAt: string;
}
export interface IStoreSizeTable {
  list: IStoreSizeTableItem[];
  loading: boolean;
  error: string | null;
  fetchSizeListByStoreSlug: (storeSlug: string) => void;
}
