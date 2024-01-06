import {
  ICreateOptionItemPayload,
  ICreateOptionPayload,
  IGetOptionByNamePayload,
  IGetOptionItemByNamePayload,
  IGetOptionPayload,
  IIsOwnerPayload,
  IUpdateOptionItemPayload,
  IUpdateOptionPayload,
} from "./action.type";

export interface IUpdateOptionRepo
  extends Omit<IUpdateOptionPayload, "storeId"> {
  newSlug: string;
}

export interface IRemoveOptionRepo {
  optionId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface ICreateOptionRepo extends Omit<ICreateOptionPayload, "value"> {
  slug: string;
}
export interface IGetOptionRepo extends IGetOptionPayload {}
export interface IGetOptionByNameRepo extends IGetOptionByNamePayload {}

export interface IGetOptionBySlugRepo {
  optionSlug: string;
  storeId: string;
}

// OptionItem
//
export interface IUpdateOptionItemRepo
  extends Omit<IUpdateOptionItemPayload, "value"> {
  newSlug: string;
}

// export interface IRemoveOptionRepo {
//   optionId: string;
// }
//
// export interface IIsOwnerRepo extends IIsOwnerPayload {}
//
export interface ICreateOptionItemRepo extends ICreateOptionItemPayload {
  slug: string;
}
// export interface IGetOptionRepo extends IGetOptionPayload {}
export interface IGetOptionItemByNameRepo extends IGetOptionItemByNamePayload {}
//
// export interface IGetOptionBySlugRepo {
//   optionSlug: string;
//   storeId: string;
// }
//
