import { OptionItem } from "@prisma/client";

export interface IStoreOptionTableItem {
  id: string;
  name: string;
  value: OptionItem[];
  slug: string;

  createdAt: string;
}
export interface IStoreOptionTable {
  list: IStoreOptionTableItem[];
  loading: boolean;
  error: string | null;
  fetchOptionListByStoreSlug: (storeSlug: string) => void;
}
