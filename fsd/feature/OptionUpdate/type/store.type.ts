import { IOption, IGetOptionBySlugPayload } from "@/fsd/entity/Option";
import { IOptionListWithRelations } from "@/fsd/entity/Option/type/entity.type";

export interface IStoreOptionUpdate {
  option: IOptionListWithRelations | null;
  error: string | null;
  loading: boolean;
  resetOption: () => void;
  getOptionCurrent: (payload: IGetOptionBySlugPayload) => void;
}
