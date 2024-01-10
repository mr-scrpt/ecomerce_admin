"use server";
import { buildError } from "@/fsd/shared/lib/buildError";
import { commonArray } from "@/fsd/shared/lib/commonArray";
import { findDiffArray } from "@/fsd/shared/lib/diffArray";
import { findInObject } from "@/fsd/shared/lib/findInObject";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { isArrayUniqueFields } from "@/fsd/shared/lib/isArrayUniqueFields";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { authAction } from "@/fsd/shared/model/action";
import { checkAuthUser } from "@/fsd/shared/model/action/auth.action";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import {
  ICreateOptionItemByListPaylod,
  ICreateOptionItemPayload,
  IGetOptionItemByNamePayload,
  IGetOptionItemListPayload,
  IIsUniqueOptionItemPayload,
  IOptionItemListPayload,
} from "../../type/action.type";
import { IOptionItem } from "../../type/entity.type";
import { optionItemRepo } from "../repo/optionItem.repo";
import { OptionItemResponseErrorEnum } from "../repo/responseError.enum";

export const createOrGetOptionItem = cache(
  async (
    data: ICreateOptionItemPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IOptionItem | null>> => {
    try {
      const { optionId, name } = data;

      await checkAuthUser(checkAuth);

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

export const createOptionItemList = cache(
  async (
    data: ICreateOptionItemPayload[],
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<IOptionItem[] | null>> => {
    try {
      await checkAuthUser(checkAuth);

      const optionList = [];

      for await (const option of data) {
        const { data, error, status } = await createOrGetOptionItem(
          option,
          false,
        );
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

export const getOptionItemByName = async (
  data: IGetOptionItemByNamePayload,
): Promise<IOptionItem | null> => {
  return await optionItemRepo.getOptionItemByName(data);
};

export const getOptionItemListByList = async (
  data: IGetOptionItemListPayload,
): Promise<IOptionItem[]> => {
  const { list, optionId } = data;

  const res = [];
  for await (const item of list) {
    const option = await getOptionItemByName({ optionId, name: item.name });
    if (option) {
      res.push(option);
    }
  }
  return res;
};

export const createOptionItemByList = async (
  data: ICreateOptionItemByListPaylod,
  checkAuth: boolean = true,
): Promise<IOptionItem[]> => {
  const { list, optionId } = data;

  await checkAuthUser(checkAuth);

  const resultList: IOptionItem[] = [];

  for await (const item of list) {
    const itemToCreate = {
      ...item,
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

  return resultList;
};

export const removeOptionItemByOption = async (
  optionId: string,
  checkAuth: boolean = true,
): Promise<ResponseDataAction<void | null>> => {
  try {
    await checkAuthUser(checkAuth);

    await optionItemRepo.removeOptionItemByOption(optionId);
    return buildResponse(void 0);
  } catch (e) {
    const { error, status } = buildError(e);
    return buildResponse(null, error, status);
  }
};

export const removeOptionItemByList = async (
  list: IOptionItem[],
  checkAuth: boolean = true,
): Promise<void> => {
  await checkAuthUser(checkAuth);

  for await (const item of list) {
    const removedItem = await optionItemRepo.removeOptionItem(item.id);

    if (!removedItem) {
      throw new HttpException(
        OptionItemResponseErrorEnum.OPTION_ITEM_NOT_REMOVED,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }
  }
};

export const updateOptionItemByList = async (
  list: IOptionItem[],
  checkAuth: boolean = true,
): Promise<IOptionItem[]> => {
  await checkAuthUser(checkAuth);

  const resultList: IOptionItem[] = [];
  for await (const item of list) {
    if (item) {
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
  }

  return resultList;
};

export const CURListOption = async (
  data: IOptionItemListPayload,
  checkAuth: boolean = true,
): Promise<ResponseDataAction<IOptionItem[] | null>> => {
  try {
    const { optionId, list } = data;

    await checkAuthUser(checkAuth);

    const isUniqueArray = isArrayUniqueFields(list, "name");

    if (!isUniqueArray) {
      throw new HttpException(
        OptionItemResponseErrorEnum.OPTION_ITEM_NOT_UNIQUE,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }

    const resultList = [];

    const optionListOld = await optionItemRepo.getOptionListItemList(optionId);
    const optionListExist = await getOptionItemListByList(data);

    const toCreateItemList = findDiffArray(list, optionListOld, "name");

    const toRemoveItemList = findDiffArray(
      optionListOld,
      optionListExist,
      "id",
    );

    removeOptionItemByList(toRemoveItemList, false);

    const toUpdateItemPrepereList = commonArray(
      optionListOld,
      optionListExist,
      "id",
    );

    const toUpdateItemList: IOptionItem[] = [];

    for (const item of toUpdateItemPrepereList) {
      const option = findInObject(list, "name", item.name);

      if (option) {
        toUpdateItemList.push({ ...item, value: option.value });
      }
    }

    resultList.push(...(await updateOptionItemByList(toUpdateItemList, false)));

    resultList.push(
      ...(await createOptionItemByList(
        { list: toCreateItemList, optionId },
        false,
      )),
    );

    return buildResponse(resultList);
  } catch (e) {
    const { error, status } = buildError(e);
    return buildResponse(null, error, status);
  }
};

const isUnique = async (data: IIsUniqueOptionItemPayload): Promise<boolean> =>
  !(await optionItemRepo.getOptionItemByName(data));
