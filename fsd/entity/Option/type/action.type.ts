import { SelectDataTypeEnum } from "./select.enum";

export interface IOptionPayload {
  storeId: string;
  name: string;
  datatype: SelectDataTypeEnum;
  value: ICreateOptionItemFromOptionPayload[];
}

export interface ICreateOptionPayload extends IOptionPayload {}

export interface IUpdateOptionPayload extends IOptionPayload {
  optionId: string;
}

export interface IGetOptionPayload {
  optionId: string;
  storeId: string;
}

export interface IGetOptionBySlugPayload {
  optionSlug: string;
  storeSlug: string;
}

export interface IGetOptionByNamePayload {
  name: string;
  storeId: string;
}

export interface IIsOwnerPayload {
  optionId: string;
  userId: string;
}

export interface IIsUniqueOptionPayload {
  name: string;
  storeId: string;
}

export interface IIsCurrentOptionPayload {
  name: string;
  optionId: string;
}

// Option Item
export interface IOptionItemPayload {
  name: string;
  value: string;
}

export interface IOptionItemListPayload {
  optionId: string;
  storeId: string;
  list: IOptionItemPayload[];
}

export interface ICreateOptionItemPayload extends IOptionItemPayload {
  optionId: string;
}

export interface ICreateOptionItemByListPaylod {
  list: IOptionItemPayload[];
  optionId: string;
}

export interface ICreateOptionItemFromOptionPayload
  extends IOptionItemPayload {}

export interface IGetOptionItemListPayload extends IOptionItemListPayload {}

export interface IUpdateOptionItemPayload extends IOptionItemPayload {}

export interface IGetOptionItemByNamePayload {
  name: string;
  optionId: string;
}

export interface IIsUniqueOptionItemPayload {
  name: string;
  optionId: string;
}
