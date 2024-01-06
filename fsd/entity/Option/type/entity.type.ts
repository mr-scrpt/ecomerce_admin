import { Option, OptionItem, Store } from "@prisma/client";

export interface IOption extends Option {}

export interface IOptionListWithRelations extends Option {
  store: Store;
  value: OptionItem[];
}

export interface IOptionItem extends OptionItem {}
