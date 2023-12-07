import { HTMLAttributes, ReactNode } from "react";
import { IComboboxGroup, IComboboxItem } from "./type";

export interface ComboboxProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpen: () => void;
  data: IComboboxGroup[];
  currentItem?: IComboboxItem;
  triggerIcon: ReactNode;
  placeholderSearch: string;
  placeholderEmpty: string;
}

export interface ComboboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  data: IComboboxGroup;
  currentItem?: IComboboxItem;
}