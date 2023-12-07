import { StoreSwitcherGropEnum } from "./group.enum";
import { StoreSwitcherHandlerEnum } from "./handler.enum";
import { StoreSwitcherIconEnum } from "./icon.enum";

export interface IStoreSwitcherItem {
  name: string;
  value: string;
  icon: StoreSwitcherIconEnum;
  handler: StoreSwitcherHandlerEnum;
  isActive: boolean;
  slug: string;
}
export interface IStoreSwitcherGroup {
  groupName: StoreSwitcherGropEnum;
  groupItemList: IStoreSwitcherItem[];
}

export interface IStoreSwitcher {
  list: IStoreSwitcherGroup[];
  current: IStoreSwitcherItem | null;
  loading: boolean;
  error: string | null;
  fetchStoreByUserIdAndCreateList: (userId: string, storeSlug: string) => void;
}
