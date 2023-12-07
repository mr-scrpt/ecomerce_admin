import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreList } from "../../type/store.type";
import { getStoreBySlug, getStoreListByUserId } from "../action/article.action";

export const useStoreData = create<IStoreList>()(
  devtools(
    (set) => ({
      storeList: [],
      storeCurrent: null,
      loading: false,
      error: null,
      setStoreCurrentBySlug: async (slug) => {
        try {
          set({ loading: true });
          const storeCurrent = await getStoreBySlug(slug);
          set({ storeCurrent }, false, "setStoreBySlug");
        } catch (e) {
          set({ error: e as string });
        } finally {
          set({ loading: false });
        }
      },
      setStoreListByUser: async (userId) => {
        try {
          set({ loading: true });
          const storeList = await getStoreListByUserId(userId);
          set({ storeList }, false, "fetchStoreListByUser");
        } catch (e) {
          set({ error: e as string });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "useStoreData" },
  ),
);
