import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreOptionList, IStoreOptionRemove } from "../../type/store.type";
import {
  getOptionListByCategoryId,
  getOptionListByStoreId,
  getOptionListByStoreSlug,
} from "../action/option.action";

export const useOptionListStore = create<IStoreOptionList>()(
  devtools(
    (set) => ({
      optionList: [],
      loading: false,
      error: null,
      fetchOptionListByStoreId: async (storeId) => {
        try {
          set({ loading: true }, false, "set_fetch_option_by_cat_loading");
          const { data, error } = await getOptionListByStoreId(storeId);

          if (error) {
            set({ error }, false, "set_fetch_option_by_cat_error");
            set({ optionList: [] });
            return;
          }

          if (data) {
            set(
              {
                optionList: data,
                error: null,
              },
              false,
              "set_fetch_option_by_cat_data",
            );
          }
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ optionList: [] });
        } finally {
          set({ loading: false }, false, "set_fetch_option_by_cat_loading");
        }
      },

      fetchOptionListByStoreSlug: async (storeSlug) => {
        try {
          set({ loading: true }, false, "set_fetch_option_by_store_loading");
          const { data, error } = await getOptionListByStoreSlug(storeSlug);
          console.log("fetch list by store =>>>", data);

          if (error) {
            set({ error }, false, "set_fetch_option_by_store_error");
            set({ optionList: [] });
            return;
          }

          if (data) {
            set(
              {
                optionList: data,
                error: null,
              },
              false,
              "set_fetch_option_by_store_data",
            );
          }
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ optionList: [] });
        } finally {
          set({ loading: false }, false, "set_fetch_option_by_store_loading");
        }
      },
    }),
    { name: "useOptionListStore" },
  ),
);

export const useOptionListCategory = create<IStoreOptionList>()(
  devtools(
    (set) => ({
      optionList: [],
      loading: false,
      error: null,
      fetchOptionListByStoreId: async (storeId) => {
        try {
          set({ loading: true }, false, "set_fetch_option_loading");
          const { data, error } = await getOptionListByCategoryId(storeId);

          if (error) {
            set({ error }, false, "set_fetch_option_error");
            set({ optionList: [] });
            return;
          }

          if (data) {
            set(
              {
                optionList: data,
                error: null,
              },
              false,
              "set_fetch_option_data",
            );
          }
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ optionList: [] });
        } finally {
          set({ loading: false }, false, "set_fetch_option_loading");
        }
      },
    }),
    { name: "useOptionListCategory" },
  ),
);

export const useOptionRemove = create<IStoreOptionRemove>()(
  devtools(
    (set) => ({
      optionId: "",
      setId: (optionId: string) => {
        set({ optionId });
      },
      resetId: () => {
        set({ optionId: "" });
      },
    }),
    { name: "useOptionRemove" },
  ),
);
