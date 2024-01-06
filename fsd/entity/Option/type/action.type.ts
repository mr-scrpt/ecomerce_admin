import { SelectDataTypeEnum } from "./select.enum";

export interface ICreateOptionPayload {
  storeId: string;
  name: string;
  datatype: SelectDataTypeEnum;
  value: ICreateOptionItemFromOptionPayload[];
}

export interface IUpdateOptionPayload {
  storeId: string;
  optionId: string;
  name: string;
  value: string;
  // imgUrl: string;
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
  // optionId: string;
}

export interface IIsOwnerPayload {
  optionId: string;
  userId: string;
}

export interface IIsUniqueOptionPayload {
  name: string;
  // optionId: string;
  storeId: string;
}

export interface IIsCurrentOptionPayload {
  name: string;
  optionId: string;
}

export interface IGetOptionByBillboardPayload {
  // storeId: string;
  billboardId: string;
}

// Option Item
export interface ICreateOptionItemFromOptionPayload {
  name: string;
  value: string;
}

export interface ICreateOptionItemPayload {
  storeId: string;
  optionId: string;
  name: string;
  value: string;
}

export interface IUpdateOptionItemPayload {
  optionId: string;
  optionItem: string;
  name: string;
  value: string;
}
//
// export interface IGetOptionItemPayload {
//   optionId: string;
//   optionItem: string;
// }
//
// export interface IGetOptionItemBySlugPayload {
//   optionItemSlug: string;
//   storeSlug: string;
// }
//
// export interface IGetOptionItemByNamePayload {
//   name: string;
//   optionId: string;
// }
//
// // export interface IIsOwnerPayload {
// //   optionItemId: string;
// //   userId: string;
// // }
//
export interface IIsUniqueOptionItemPayload {
  name: string;
  optionId: string;
  // storeId: string;
}
//
// export interface IIsCurrentOptionItemPayload {
//   name: string;
//   optionId: string;
// }
//
// // export interface IGetOptionByBillboardPayload {
// //   // storeId: string;
// //   billboardId: string;
// // }
