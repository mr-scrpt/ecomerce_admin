import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreList } from "../../type/store.type";
import { getStoreBySlug, getStoreListByUserId } from "../action/store.action";

export const useStoreData = create<IStoreList>()(
  devtools(
    (set) => ({
      storeList: [],
      storeCurrent: null,
      loading: false,
      error: null,
      setStoreCurrentBySlug: async (slug) => {
        try {
          set({ loading: true }, false, "set_store_loading");
          const { data, error } = await getStoreBySlug(slug);
          if (error) {
            set({ error, storeCurrent: null }, false, "set_store_error");
            return;
          }
          if (data) {
            set({ storeCurrent: data, error: null }, false, "set_store_data");
          }
        } catch (e) {
          set({
            error: HTTPErrorMessage.SERVER_ERROR,
            storeCurrent: null,
          });
        } finally {
          set({ loading: false }, false, "set_store_loading");
        }
      },
      setStoreListByUser: async (userId) => {
        try {
          set({ loading: true }, false, "set_store_list_loading");
          const { data, error } = await getStoreListByUserId(userId);
          if (error) {
            set({ error, storeList: [] }, false, "set_store_list_error");
            return;
          }
          if (data) {
            set(
              { storeList: data, loading: false, error: null },
              false,
              "fetchStoreListByUser",
            );
          }
        } catch (e) {
          set({
            error: HTTPErrorMessage.SERVER_ERROR,
            storeList: [],
          });
        } finally {
          set({ loading: false }, false, "set_store_list_loading");
        }
      },
    }),
    { name: "useStoreData" },
  ),
);
