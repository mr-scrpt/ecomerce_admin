import { IBillboard } from "./entity.type";

export interface IStoreBillboardList {
  billboardList: IBillboard[];
  loading: boolean;
  error: string | null;
  fetchBillboardList: (storeId: string) => void;
}
