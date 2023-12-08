import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreList } from "../../type/store.type";
import { getStoreBySlug, getStoreListByUserId } from "../action/store.action";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

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
          const { data, error } = await getStoreBySlug(slug);
          if (error) {
            set({ error });
            set({ storeList: [] });
            set({ storeCurrent: null });
            return;
          }
          if (data) {
            set({ storeCurrent: data }, false, "setStoreBySlug");
          }
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ storeList: [] });
          set({ storeCurrent: null });
        } finally {
          set({ loading: false });
        }
      },
      setStoreListByUser: async (userId) => {
        set({ loading: true });
        const { data, error } = await getStoreListByUserId(userId);
        if (error) {
          set({ error });
          set({ storeList: [] });
          set({ storeCurrent: null });
          set({ loading: false });
          return;
        }
        if (data) {
          set({ storeList: data }, false, "fetchStoreListByUser");
        }
        set({ loading: false });
      },
    }),
    { name: "useStoreData" },
  ),
);
