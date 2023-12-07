import { HTMLAttributes, ReactNode } from "react";
import { IComboboxGroup, IComboboxItem } from "./interface";

export interface ComboboxProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpen: () => void;
  data: IComboboxGroup[];
  // currentItem?: ComboboxItemI;
  currentItem?: string;
  triggerIcon: ReactNode;
  placeholderSearch: string;
  placeholderEmpty: string;
}

export interface ComboboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  data: IComboboxGroup;
  currentItem?: string;
}
