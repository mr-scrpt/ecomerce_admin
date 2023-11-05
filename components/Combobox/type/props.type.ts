import { HTMLAttributes, ReactNode } from "react";
import { ComboboxGroupI, ComboboxItemI } from "./interface";

export interface ComboboxProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpen: () => void;
  data: ComboboxGroupI[];
  currentItem?: ComboboxItemI;
  triggerIcon: ReactNode;
  placeholderSearch: string;
  placeholderEmpty: string;
}

export interface ComboboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  data: ComboboxGroupI;
  // currentItem?: ComboboxItemI;
}
