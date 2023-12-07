import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreList } from "../../type/store.type";
import { getStoreBySlug, getStoreListByUserId } from "../action/article.action";

export const useStoreData = create<IStoreList>()(
  devtools(
    (set) => ({
      storeList: [],
      storeCurrent: null,
      setStoreCurrentBySlug: async (slug) => {
        const storeCurrent = await getStoreBySlug(slug);
        set({ storeCurrent }, false, "setStoreBySlug");
      },
      setStoreListByUser: async (userId) => {
        const storeList = await getStoreListByUserId(userId);
        set({ storeList }, false, "fetchStoreListByUser");
      },
    }),
    { name: "useStoreData" },
  ),
);
