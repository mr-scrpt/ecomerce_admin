import { ReactNode } from "react";
import { IStoreSwitcherGroup, IStoreSwitcherItem } from "./store.type";
import { LucideIcon } from "lucide-react";

export interface IStoreSwitcherGroupUI
  extends Omit<IStoreSwitcherGroup, "groupItemList"> {
  groupItemList: IStoreSwitcherItemUI[];
}

export interface IStoreSwitcherItemUI
  extends Omit<IStoreSwitcherItem, "slug" | "icon" | "handler"> {
  // icon: string;
  // icon: LucideIcon;
  icon: ReactNode;
  handler: (str: string) => void;
}
