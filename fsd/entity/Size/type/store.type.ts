import { ISizeWithRelations } from "./entity.type";

export interface IStoreSizeList {
  sizeList: ISizeWithRelations[];
  loading: boolean;
  error: string | null;
  fetchSizeList: (storeId: string) => void;
}

export interface IStoreSizeRemove {
  sizeId: string;
  setId: (sizeId: string) => void;
  resetId: () => void;
}

// export interface IStoreSizeUpdate {
//   sizeId: string;
//   size: ISize | null;
//   error: string | null;
//   loading: boolean;
//   setId: (sizeId: string) => void;
//   resetId: () => void;
//   resetSize: () => void;
//   getSizeCurrent: () => void;
// }
