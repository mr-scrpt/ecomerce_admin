import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreListStore, IStoreStore } from "../../type/store.type";
import { getStoreBySlug, getStoreListByUserId } from "../action/store.action";
import { storeAction } from "../..";

export const useStoreListData = create<IStoreListStore>()(
  devtools(
    (set) => ({
      storeList: [],
      loading: false,
      error: null,
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

export const useStoreData = create<IStoreStore>()(
  devtools(
    (set, get) => ({
      storeCurrent: null,
      loading: false,
      error: null,
      setStoreBySlug: async (slug) => {
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
      // updateStoreData: async (newStoreName: string) => {
      //   try {
      //     set({ loading: true }, false, "set_store_loading");
      //     const currentStoreName = get().storeCurrent?.name;
      //     if (!currentStoreName) {
      //       set(
      //         { error: "Store not found", storeCurrent: null },
      //         false,
      //         "set_store_error",
      //       );
      //       return;
      //     }
      //     const { data, error } = await storeAction.renameStore({
      //       currentStoreName,
      //       newStoreName,
      //     });
      //     if (error) {
      //       set({ error, storeCurrent: null }, false, "set_store_error");
      //       return;
      //     }
      //     if (data) {
      //       set({ storeCurrent: data, error: null }, false, "set_store_data");
      //     }
      //   } catch (e) {
      //     set({
      //       error: HTTPErrorMessage.SERVER_ERROR,
      //       storeCurrent: null,
      //     });
      //   } finally {
      //     set({ loading: false }, false, "set_store_loading");
      //   }
      // },
    }),
    { name: "useStoreData" },
  ),
);
