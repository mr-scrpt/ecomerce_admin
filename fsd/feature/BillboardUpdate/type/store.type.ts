import { IBillboard, IGetBillboardBySlugPayload } from "@/fsd/entity/Billboard";

export interface IStoreBillboardUpdate {
  // billboardId: string;
  billboard: IBillboard | null;
  error: string | null;
  loading: boolean;
  // setId: (billboardId: string) => void;
  // resetId: () => void;
  resetBillboard: () => void;
  getBillboardCurrent: (data: IGetBillboardBySlugPayload) => void;
}
