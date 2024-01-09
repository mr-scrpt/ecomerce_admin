import {
  ICreateOptionItemPayload,
  ICreateOptionPayload,
  IGetOptionByNamePayload,
  IGetOptionItemByNamePayload,
  IGetOptionPayload,
  IIsOwnerPayload,
  IUpdateOptionPayload,
} from "./action.type";
import { IOptionItem } from "./entity.type";

export interface ICreateOptionRepo extends Omit<ICreateOptionPayload, "value"> {
  slug: string;
}

export interface IUpdateOptionRepo
  extends Omit<IUpdateOptionPayload, "storeId" | "value"> {
  newSlug: string;
}

export interface IRemoveOptionRepo {
  optionId: string;
}

export interface IIsOwnerRepo extends IIsOwnerPayload {}

export interface IGetOptionRepo extends IGetOptionPayload {}
export interface IGetOptionByNameRepo extends IGetOptionByNamePayload {}

export interface IGetOptionBySlugRepo {
  optionSlug: string;
  storeId: string;
}

export interface IUpdateOptionItemRepo extends IOptionItem {
  newSlug: string;
}

export interface ICreateOptionItemRepo extends ICreateOptionItemPayload {
  slug: string;
}
export interface IGetOptionItemByNameRepo extends IGetOptionItemByNamePayload {}

export interface IRemoveOptionItemByName {
  optionId: string;
  name: string;
}
