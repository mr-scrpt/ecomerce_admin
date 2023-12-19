export interface IStoreBillboardRemove {
  billboardId: string;
  setId: (billboardId: string) => void;
  resetId: () => void;
}
