export interface IStoreColorTableItem {
  id: string;
  name: string;
  value: string;
  slug: string;

  createdAt: string;
}
export interface IStoreColorTable {
  list: IStoreColorTableItem[];
  loading: boolean;
  error: string | null;
  fetchColorListByStoreSlug: (storeSlug: string) => void;
}
