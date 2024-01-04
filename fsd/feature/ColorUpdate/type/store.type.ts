import { IColor, IGetColorBySlugPayload } from "@/fsd/entity/Color";

export interface IStoreColorUpdate {
  color: IColor | null;
  error: string | null;
  loading: boolean;
  resetColor: () => void;
  getColorCurrent: (payload: IGetColorBySlugPayload) => void;
}
