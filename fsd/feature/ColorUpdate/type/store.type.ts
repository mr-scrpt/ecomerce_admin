import { IColor } from "@/fsd/entity/Color";

export interface IStoreColorUpdate {
  colorId: string;
  color: IColor | null;
  error: string | null;
  loading: boolean;
  setId: (colorId: string) => void;
  resetId: () => void;
  resetColor: () => void;
  getColorCurrent: () => void;
}
