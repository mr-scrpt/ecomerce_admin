import { IBillboard } from "./entity.type";

export interface IStoreBillboardList {
  billboardList: IBillboard[];
  loading: boolean;
  error: string | null;
  fetchBillboardList: (storeId: string) => void;
  fetchBillboardListByStoreSlug: (storeSlug: string) => void;
}

// export interface IStoreBillboardTable {
//   list: IStoreBillboardTableItem[];
//   loading: boolean;
//   error: string | null;
//   fetchBillboardList: (storeId: string) => void;
// }
