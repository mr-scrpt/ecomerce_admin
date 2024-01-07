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
  ICreateOptionPayload,
  IGetOptionBySlugPayload,
  IIsCurrentOptionPayload,
  IIsOwnerPayload,
  IIsUniqueOptionPayload,
  IUpdateOptionPayload,
} from "../../type/action.type";
import { IOption, IOptionListWithRelations } from "../../type/entity.type";
import { optionRepo } from "../repo/option.repo";
import {
  OptionItemResponseErrorEnum,
  OptionResponseErrorEnum,
} from "../repo/responseError.enum";
import {
  CURListOption,
  calculateListOption,
  createOptionItemList,
  updateOptionItemList,
} from "./optionItem.action";

export const createOption = cache(
  async (
    data: ICreateOptionPayload,
  ): Promise<ResponseDataAction<IOption | null>> => {
    try {
      const { error, status } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const { storeId, name, datatype, value } = data;

      const isUniqueResponse = await isUnique({
        name,
        storeId,
      });

      if (!isUniqueResponse) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NOT_UNIQUE,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const storeResponse = await storeAction.getStore(storeId);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const slug = slugGenerator(name);

      const option = await optionRepo.createOption({
        storeId,
        name,
        datatype,
        slug,
      });

      if (!option) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NOT_CREATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      const optionListFormated = value.map((item) => ({
        ...item,
        storeId,
        optionId: option.id,
      }));

      const { data: createListItem, error: createListError } =
        await createOptionItemList(optionListFormated);

      if (createListError) {
        throw new HttpException(createListError);
      }

      const optionFormated = {
        ...option,
        value: createListItem ? createListItem : [],
      };

      return buildResponse(optionFormated);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getOptionBySlug = cache(
  async (
    data: IGetOptionBySlugPayload,
  ): Promise<ResponseDataAction<IOptionListWithRelations | null>> => {
    try {
      const { storeSlug, optionSlug } = data;

      const storeResponse = await storeAction.getStoreBySlug(storeSlug);

      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const store = storeResponse.data;

      const option = await optionRepo.getOptionBySlug({
        optionSlug,
        storeId: store!.id,
      });

      if (!option) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      return buildResponse(option);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getOption = cache(
  async (optionId: string): Promise<ResponseDataAction<IOption | null>> => {
    try {
      const option = await optionRepo.getOption(optionId);
      if (!option) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }
      return buildResponse(option);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getOptionListByStoreId = cache(
  async (storeId: string): Promise<ResponseDataAction<IOption[] | null>> => {
    try {
      const optionList = await optionRepo.getOptionList(storeId);
      return buildResponse(optionList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getOptionListByStoreSlug = cache(
  async (storeSlug: string): Promise<ResponseDataAction<IOption[] | null>> => {
    try {
      const optionList = await optionRepo.getOptionListByStoreSlug(storeSlug);

      return buildResponse(optionList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const getOptionListByCategory = cache(
  async (
    billboardId: string,
  ): Promise<ResponseDataAction<IOption[] | null>> => {
    try {
      const optionList = await optionRepo.getOptionByCategory(billboardId);
      return buildResponse(optionList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const updateOption = cache(
  async (
    data: IUpdateOptionPayload,
  ): Promise<ResponseDataAction<IOption | null>> => {
    try {
      const { error, status } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const { storeId, optionId, name, datatype, value } = data;

      const storeResponse = await storeAction.getStore(storeId);
      if (storeResponse.error) {
        throw new HttpException(storeResponse.error);
      }

      const isExistResponse = await isExist(optionId);

      if (!isExistResponse) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NOT_EXIST,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const isCurrentResponse = await isCurrent({ name, optionId });

      if (!isCurrentResponse) {
        const isUniqueResponse = await isUnique({ name, storeId });

        if (!isUniqueResponse) {
          throw new HttpException(
            OptionResponseErrorEnum.OPTION_NOT_UNIQUE,
            HTTPStatusEnum.BAD_REQUEST,
          );
        }
      }

      const newSlug = slugGenerator(name);

      const option = await optionRepo.updateOption({
        optionId,
        name,
        newSlug,
        datatype,
      });

      if (!option) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NOT_UPDATED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }
      //TODO CREATE NEW OPTION ITEM IF NOT EXIST
      //TODO UPDATE NEW OPTION ITEM IF NOT EXIST
      //TODO DELETE IF NOT USE IN POSITION NEW OPTION ITEM IF NOT EXIST
      const { data: updatedItemList, error: updateListError } =
        await CURListOption({ optionId, storeId, list: value });

      if (updateListError) {
        throw new HttpException(updateListError);
      }

      // const optionListFormated = updatedItemList!.map((item) => ({
      //   ...item,
      //   storeId,
      //   optionId,
      //   optionIdItem: item.id,
      // }));

      const optionFormated = {
        ...option,
        value: updatedItemList ? updatedItemList : [],
      };

      return buildResponse(optionFormated);
    } catch (e) {
      console.log("error on update =>>>", e);
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

export const removeOption = cache(
  async (optionId: string): Promise<ResponseDataAction<IOption | null>> => {
    try {
      const { error, status, data: udata } = await authAction.getAuthUser();
      if (error) {
        throw new HttpException(error, status);
      }

      const option = await getOption(optionId);
      const { data } = option;

      if (!data) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const userId = udata!.id;
      const isOwnerResponse = await isOwner({
        optionId: data.id,
        userId,
      });
      if (!isOwnerResponse) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NO_OWNER,
          HTTPStatusEnum.FORBIDDEN,
        );
      }

      const optionRemover = await optionRepo.removeOption({
        optionId,
      });

      if (!optionRemover) {
        throw new HttpException(
          OptionResponseErrorEnum.OPTION_NOT_REMOVED,
          HTTPStatusEnum.BAD_REQUEST,
        );
      }

      return buildResponse(optionRemover);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);

const isUnique = async (data: IIsUniqueOptionPayload): Promise<boolean> =>
  !(await optionRepo.getOptionByName(data));

const isCurrent = async (data: IIsCurrentOptionPayload): Promise<boolean> => {
  const { name, optionId } = data;
  const cat = await optionRepo.getOption(optionId);
  const isCurrent = cat && cat.name === name;

  return !!isCurrent;
};

const isExist = cache(
  async (optionId: string): Promise<boolean> =>
    !!(await optionRepo.getOption(optionId)),
);

const isOwner = cache(
  async (data: IIsOwnerPayload): Promise<boolean> =>
    !!(await optionRepo.getOptionIsOwner(data)),
);
