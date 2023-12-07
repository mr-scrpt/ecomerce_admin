import { ReactNode } from "react";

export interface IComboboxItem {
  name: string;
  value: string;
  icon: ReactNode;
  isActive: boolean;
  slug: string;
  handler: (elem: string) => void;
}
export interface IComboboxGroup {
  groupName: string;
  groupItemList: IComboboxItem[];
}
