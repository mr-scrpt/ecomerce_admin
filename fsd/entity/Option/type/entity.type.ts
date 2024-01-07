import { Option, OptionItem, Store } from "@prisma/client";
import { SelectDataTypeEnum } from "./select.enum";

export interface IOption extends Option {}

export interface IOptionListWithRelations extends Option {
  store: Store;
  value: OptionItem[];
  datatype: SelectDataTypeEnum;
}

export interface IOptionItem extends OptionItem {}
