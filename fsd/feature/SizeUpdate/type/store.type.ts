import { ISize } from "@/fsd/entity/Size";

export interface IStoreSizeUpdate {
  sizeId: string;
  size: ISize | null;
  error: string | null;
  loading: boolean;
  setId: (sizeId: string) => void;
  resetId: () => void;
  resetSize: () => void;
  getSizeCurrent: () => void;
}
