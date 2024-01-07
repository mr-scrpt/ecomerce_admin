"use server";
import { storeAction } from "@/fsd/entity/Store";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { authAction } from "@/fsd/shared/modle/action";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import {
  ICUDOptionItemList,
  ICreateOptionItemPayload,
  IGetOptionItemByNamePayload,
  IIsUniqueOptionItemPayload,
  IOptionItemListPayload,
  IOptionItemPayload,
  IUpdateOptionItemPayload,
} from "../../type/action.type";
import { IOptionItem } from "../../type/entity.type";
import { optionItemRepo } from "../repo/optionItem.repo";
import { OptionItemResponseErrorEnum } from "../repo/responseError.enum";
import { findDiffArray } from "@/fsd/shared/lib/diffArray";
import { commonArray } from "@/fsd/shared/lib/commonArray";
import { longestArray } from "@/fsd/shared/lib/longestArray";
import { updateOption } from "./option.action";
import { isArrayUniqueFields } from "@/fsd/shared/lib/isArrayUniqueFields";

export const createOrGetOptionItemWithOutCheckUser = cache(
  async (
    data: ICreateOptionItemPayload,
  ): Promise<ResponseDataAction<IOptionItem | null>> => {
    try {
      const { storeId, optionId, name } = data;

      const isUniqueResponse = await isUnique({
        name,
        optionId,
      });

      if (!isUniqueResponse) {
        throw new HttpException(
          OptionItemResponseErrorEnum.OPTION_ITEM_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const storeResponse = await storeAction.getStore(storeId);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const slug = slugGenerator(name);

      const optionItem = await optionItemRepo.createOptionItem({
        ...data,
        slug,
      });

      if (!optionItem) {
        throw new HttpException(
          OptionItemResponseErrorEnum.OPTION_ITEM_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      return buildResponse(optionItem);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

const _getOptionItemByName = async (
  data: IGetOptionItemByNamePayload,
): Promise<IOptionItem | null> => {
  return await optionItemRepo.getOptionItemByName(data);
};
const _getOptionItemListByList = async (
  data: IOptionItemListPayload,
): Promise<IOptionItem[]> => {
  const { list, optionId } = data;

  const res = [];
  for await (const item of list) {
    const option = await _getOptionItemByName({ optionId, name: item.name });
    if (option) {
      res.push(option);
    }
  }
  return res;
};

export const CURListOption = async (
  data: IOptionItemListPayload,
): Promise<ResponseDataAction<IOptionItem[] | null>> => {
  try {
    const { optionId, storeId, list } = data;

    const isUniqueArray = isArrayUniqueFields(list, "name");

    if (!isUniqueArray) {
      throw new HttpException(
        OptionItemResponseErrorEnum.OPTION_ITEM_NOT_UNIQUE,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }

    const resultList = [];

    const optionListOld = await optionItemRepo.getOptionListItemList(optionId);
    const optionListExist = await _getOptionItemListByList(data);

    const toRemoveItemList = findDiffArray(
      optionListOld,
      optionListExist,
      "id",
    );
    const toUpdateItemList = commonArray(optionListOld, optionListExist, "id");

    const toCreateItemList = findDiffArray(list, optionListOld, "name");

    for await (const item of toRemoveItemList) {
      const removedItem = await optionItemRepo.removeOptionItem(item.id);

      if (!removedItem) {
        throw new HttpException(
          OptionItemResponseErrorEnum.OPTION_ITEM_NOT_REMOVED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
    }

    for await (const item of toUpdateItemList) {
      const itemToUpdate = {
        ...item,
        newSlug: slugGenerator(item.name),
      };

      const updateItem = await optionItemRepo.updateOptionItem(itemToUpdate);

      if (!updateItem) {
        throw new HttpException(
          OptionItemResponseErrorEnum.OPTION_ITEM_NOT_UPDATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      resultList.push(updateItem);
    }

    for await (const item of toCreateItemList) {
      const itemToCreate = {
        ...item,
        storeId,
        optionId,
        slug: slugGenerator(item.name),
      };

      const createItem = await optionItemRepo.createOptionItem(itemToCreate);

      if (!createItem) {
        throw new HttpException(
          OptionItemResponseErrorEnum.OPTION_ITEM_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      resultList.push(createItem);
    }

    return buildResponse(resultList);
  } catch (e) {
    const { error, status } = buildError(e);
    return buildResponse(null, error, status);
  }
};

// export const updateOrGetOptionItemWithOutCheckUser = cache(
//   async (
//     data: IUpdateOptionItemPayload,
//   ): Promise<ResponseDataAction<IOptionItem | null>> => {
//     try {
//       const { storeId, optionId, optionIdItem, name, value } = data;
//
//       const isUniqueResponse = await isUnique({
//         name,
//         optionId,
//       });
//
//       if (!isUniqueResponse) {
//         throw new HttpException(
//           OptionItemResponseErrorEnum.OPTION_ITEM_NOT_UNIQUE,
//           HTTPStatusEnum.BAD_REQUEST,
//         );
//       }
//
//       const storeResponse = await storeAction.getStore(storeId);
//
//       if (storeResponse.error) {
//         throw new HttpException(storeResponse.error);
//       }
//
//       const slug = slugGenerator(name);
//
//       const optionItem = await optionItemRepo.updateOptionItem({
//         ...data,
//         slug,
//       });
//
//       if (!optionItem) {
//         throw new HttpException(
//           OptionItemResponseErrorEnum.OPTION_ITEM_NOT_CREATED,
//           HTTPStatusEnum.BAD_REQUEST,
//         );
//       }
//       return buildResponse(optionItem);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );
// export const createOptionItem = cache(
//   async (
//     data: ICreateOptionItemPayload,
//   ): Promise<ResponseDataAction<IOptionItem | null>> => {
//     try {
//       const { error, status } = await authAction.getAuthUser();
//       if (error) {
//         throw new HttpException(error, status);
//       }
//
//       return await createOptionItemWithOutCheckUser(data);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

export const createOptionItemList = cache(
  async (
    data: ICreateOptionItemPayload[],
  ): Promise<ResponseDataAction<IOptionItem[] | null>> => {
    try {
      const { error, status } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const optionList = [];

      for await (const option of data) {
        const { data, error } =
          await createOrGetOptionItemWithOutCheckUser(option);
        if (error) {
          throw new HttpException(error, status);
        }
        if (data) {
          optionList.push(data);
        }
      }

      return buildResponse(optionList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

// export const updateOptionItemList = cache(
//   async (
//     data: IUpdateOptionItemPayload[],
//   ): Promise<ResponseDataAction<IOptionItem[] | null>> => {
//     try {
//       const { error, status } = await authAction.getAuthUser();
//       if (error) {
//         throw new HttpException(error, status);
//       }
//
//       const optionList = [];
//
//       for await (const option of data) {
//         const { data, error } =
//           await updateOrGetOptionItemWithOutCheckUser(option);
//         if (error) {
//           throw new HttpException(error, status);
//         }
//         if (data) {
//           optionList.push(data);
//         }
//       }
//
//       return buildResponse(optionList);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

// export const getoptionItemItemBySlug = cache(
//   async (
//     data: IGetoptionItemItemBySlugPayload,
//   ): Promise<ResponseDataAction<IoptionItemItem | null>> => {
//     try {
//       const { storeSlug, optionItemSlug } = data;
//
//       const storeResponse = await storeAction.getStoreBySlug(storeSlug);
//
//       if (storeResponse.error) {
//         throw new HttpException(storeResponse.error);
//       }
//
//       const store = storeResponse.data;
//       const optionItem = await optionRepo.getOptionItemBySlug({
//         optionItemSlug,
//         storeId: store!.id,
//       });
//       if (!optionItem) {
//         throw new HttpException(
//           optionItemItemResponseErrorEnum.OPTION_NOT_FOUND,
//           HTTPStatusEnum.NOT_FOUND,
//         );
//       }
//       return buildResponse(optionItem);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

// export const getOptionItem = cache(
//   async (
//     optionItemId: string,
//   ): Promise<ResponseDataAction<IOptionItem | null>> => {
//     try {
//       const optionItem = await optionRepo.getOptionItem(optionId);
//       if (!optionItem) {
//         throw new HttpException(
//           OptionItemResponseErrorEnum.OPTION_ITEM_NOT_FOUND,
//           HTTPStatusEnum.NOT_FOUND,
//         );
//       }
//       return buildResponse(optionItem);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

// export const getOptionItemListByStoreId = cache(
//   async (
//     storeId: string,
//   ): Promise<ResponseDataAction<IOptionItem[] | null>> => {
//     try {
//       const optionItemList = await optionRepo.getOptionItemList(storeId);
//       return buildResponse(optionItemList);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

// export const getoptionItemItemListByStoreSlug = cache(
//   async (
//     storeSlug: string,
//   ): Promise<ResponseDataAction<IoptionItemItemWithRelations[] | null>> => {
//     try {
//       const optionItemList = await optionRepo.getOptionItemListByStoreSlug(storeSlug);
//
//       return buildResponse(optionItemList);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

// export const getOptionItemListByCategory = cache(
//   async (
//     billboardId: string,
//   ): Promise<ResponseDataAction<IOptionItem[] | null>> => {
//     try {
//       const optionItemList =
//         await optionRepo.getOptionItemByCategory(billboardId);
//       return buildResponse(optionItemList);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

// export const updateoptionItemItem = cache(
//   async (
//     data: IUpdateoptionItemItemPayload,
//   ): Promise<ResponseDataAction<IoptionItemItem | null>> => {
//     try {
//       const { error, status } = await authAction.getAuthUser();
//       if (error) {
//         throw new HttpException(error, status);
//       }
//
//       const { storeId, optionItemId, name, value } = data;
//
//       const storeResponse = await storeAction.getStore(storeId);
//       if (storeResponse.error) {
//         throw new HttpException(storeResponse.error);
//       }
//
//       const isExistResponse = await isExist(optionItemId);
//
//       if (!isExistResponse) {
//         throw new HttpException(
//           optionItemItemResponseErrorEnum.OPTION_NOT_EXIST,
//           HTTPStatusEnum.NOT_FOUND,
//         );
//       }
//
//       const isCurrentResponse = await isCurrent({ name, optionItemId });
//
//       if (!isCurrentResponse) {
//         const isUniqueResponse = await isUnique({ name, storeId });
//
//         if (!isUniqueResponse) {
//           throw new HttpException(
//             optionItemItemResponseErrorEnum.OPTION_NOT_UNIQUE,
//             HTTPStatusEnum.BAD_REQUEST,
//           );
//         }
//       }
//
//       const newSlug = slugGenerator(name);
//
//       const optionItem = await optionRepo.updateOptionItem({
//         optionItemId,
//         name,
//         newSlug,
//         value,
//       });
//
//       if (!optionItem) {
//         throw new HttpException(
//           optionItemItemResponseErrorEnum.OPTION_NOT_UPDATED,
//           HTTPStatusEnum.BAD_REQUEST,
//         );
//       }
//       return buildResponse(optionItem);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

// export const removeOptionItem = cache(
//   async (
//     optionItemId: string,
//   ): Promise<ResponseDataAction<IOptionItem | null>> => {
//     try {
//       const { error, status, data: udata } = await authAction.getAuthUser();
//       if (error) {
//         throw new HttpException(error, status);
//       }
//
//       const optionItem = await getOptionItem(optionId);
//       const { data } = optionItem;
//
//       if (!data) {
//         throw new HttpException(
//           optionItemItemResponseErrorEnum.OPTION_NOT_FOUND,
//           HTTPStatusEnum.NOT_FOUND,
//         );
//       }
//
//       const userId = udata!.id;
//       const isOwnerResponse = await isOwner({
//         optionItemId: data.id,
//         userId,
//       });
//       if (!isOwnerResponse) {
//         throw new HttpException(
//           optionItemItemResponseErrorEnum.OPTION_NO_OWNER,
//           HTTPStatusEnum.FORBIDDEN,
//         );
//       }
//
//       const optionItemRemover = await optionRepo.removeOptionItem({
//         optionItemId,
//       });
//
//       if (!optionItemRemover) {
//         throw new HttpException(
//           optionItemItemResponseErrorEnum.OPTION_NOT_REMOVED,
//           HTTPStatusEnum.BAD_REQUEST,
//         );
//       }
//
//       return buildResponse(optionItemRemover);
//     } catch (e) {
//       const { error, status } = buildError(e);
//       return buildResponse(null, error, status);
//     }
//   },
// );

const isUnique = async (data: IIsUniqueOptionItemPayload): Promise<boolean> =>
  !(await optionItemRepo.getOptionItemByName(data));

// const isCurrent = async (
//   data: IIsCurrentOptionItemPayload,
// ): Promise<boolean> => {
//   const { name, optionItemId } = data;
//   const cat = await optionItemRepo.getOptionItem(optionId);
//   const isCurrent = cat && cat.name === name;
//
//   return !!isCurrent;
// };
//
// const isExist = cache(
//   async (optionItemId: string): Promise<boolean> =>
//     !!(await optionItemRepo.getOptionItem(optionId)),
// );
//
// const isOwner = cache(
//   async (data: IIsOwnerPayload): Promise<boolean> =>
//     !!(await optionItemRepo.getOptionItemIsOwner(data)),
// );
