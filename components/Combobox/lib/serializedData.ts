import { Store } from "@prisma/client";
import { ComboboxItemI } from "../type/interface";
import { ReactNode } from "react";

export const getSerializedData = (
  items: Store[],
  icon: ReactNode,
  onSelectItem: (value: string) => void,
  active: string,
): ComboboxItemI[] =>
  items.map((item) => ({
    name: item.name,
    value: item.slug,
    icon: icon,
    onSelectItem: () => onSelectItem(item.slug),
    isActive: active === item.slug,
  }));

export const getCurrentItem = (
  items: ComboboxItemI[],
  currentSlug: string | undefined,
) => items.find((item) => item.value === currentSlug);
