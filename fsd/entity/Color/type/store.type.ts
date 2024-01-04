import { IColorWithRelations } from "./entity.type";

export interface IStoreColorList {
  colorList: IColorWithRelations[];
  loading: boolean;
  error: string | null;
  fetchColorList: (storeId: string) => void;
}

export interface IStoreColorRemove {
  colorId: string;
  setId: (colorId: string) => void;
  resetId: () => void;
}

// export interface IStoreColorUpdate {
//   colorId: string;
//   color: IColor | null;
//   error: string | null;
//   loading: boolean;
//   setId: (colorId: string) => void;
//   resetId: () => void;
//   resetColor: () => void;
//   getColorCurrent: () => void;
// }
