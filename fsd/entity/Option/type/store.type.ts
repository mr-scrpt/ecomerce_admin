import { IOption, IOptionListWithRelations } from "./entity.type";

export interface IStoreOptionList {
  // optionList: IOptionListWithRelations[];
  optionList: IOption[];
  loading: boolean;
  error: string | null;
  fetchOptionListByStoreId: (storeId: string) => void;
  fetchOptionListByStoreSlug: (storeSlug: string) => void;
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
