"use server";
import { IStore } from "../../type/store.type";
import { repo } from "../repo";

export const getStoreBySlug = async (slug?: string): Promise<IStore | null> => {
  try {
    return await repo.getStoreBySlugAndUserId(slug);
  } catch (e) {
    throw new Error("[ARTICLE_ACTION: getStoreBySlugAndUserId]");
  }
};

export const getStoreListByUserId = async (
  userId: string,
): Promise<IStore[]> => {
  try {
    return await repo.getStoreList(userId);
  } catch (e) {
    throw new Error("[ARTICLE_ACTION: getStoreList]");
  }
};
