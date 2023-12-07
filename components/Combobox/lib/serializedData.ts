import { Store } from "@prisma/client";
import { IComboboxItem } from "../type/type";
import { ReactNode } from "react";

export const getSerializedData = (
  items: Store[],
  icon: ReactNode,
  onSelectItem: (value: string) => void,
): IComboboxItem[] =>
  items.map((item) => ({
    name: item.name,
    value: item.slug,
    icon: icon,
    onSelectItem: () => onSelectItem(item.slug),
    isActive: true,
  }));

export const getCurrentItem = (
  items: IComboboxItem[],
  currentSlug: string | undefined,
) => items.find((item) => item.value === currentSlug);
