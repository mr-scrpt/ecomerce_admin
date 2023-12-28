import { IBillboard } from "./entity.type";

export interface IStoreBillboardList {
  billboardList: IBillboard[];
  loading: boolean;
  error: string | null;
  fetchBillboardList: (storeId: string) => void;
}

export interface IStoreBillboardTableItem {
  id: string;
  name: string;
  createdAt: string;
}
export interface IStoreBillboardTable {
  list: IStoreBillboardTableItem[];
  loading: boolean;
  error: string | null;
  fetchBillboardListByStoreSlug: (storeSlug: string) => void;
}
