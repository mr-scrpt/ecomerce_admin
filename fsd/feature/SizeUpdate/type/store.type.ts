import { IGetSizeBySlugPayload, ISize } from "@/fsd/entity/Size";

export interface IStoreSizeUpdate {
  size: ISize | null;
  error: string | null;
  loading: boolean;
  resetSize: () => void;
  getSizeCurrent: (payload: IGetSizeBySlugPayload) => void;
}
