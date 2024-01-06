import { IOptionWithRelations } from "./entity.type";

export interface IStoreOptionList {
  optionList: IOptionWithRelations[];
  loading: boolean;
  error: string | null;
  fetchOptionList: (storeId: string) => void;
}

export interface IStoreOptionRemove {
  optionId: string;
  setId: (optionId: string) => void;
  resetId: () => void;
}

// export interface IStoreOptionUpdate {
//   optionId: string;
//   option: IOption | null;
//   error: string | null;
//   loading: boolean;
//   setId: (optionId: string) => void;
//   resetId: () => void;
//   resetOption: () => void;
//   getOptionCurrent: () => void;
// }
