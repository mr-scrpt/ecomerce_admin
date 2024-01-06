import { IOption, IGetOptionBySlugPayload } from "@/fsd/entity/Option";

export interface IStoreOptionUpdate {
  option: IOption | null;
  error: string | null;
  loading: boolean;
  resetOption: () => void;
  getOptionCurrent: (payload: IGetOptionBySlugPayload) => void;
}
