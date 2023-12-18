export interface IStoreBillboardTableItem {
  id: string;
  name: string;

  // imgUrl: string[];
  createdAt: string;
}
export interface IStoreBillboardTable {
  list: IStoreBillboardTableItem[];
  loading: boolean;
  error: string | null;
  fetchBillboardByStoreSlug: (storeSlug: string) => void;
}
