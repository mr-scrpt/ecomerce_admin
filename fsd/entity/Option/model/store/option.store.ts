import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreOptionList, IStoreOptionRemove } from "../../type/store.type";
import { getOptionListByStoreId } from "../action/option.action";

export const useOptionList = create<IStoreOptionList>()(
  devtools(
    (set) => ({
      optionList: [],
      loading: false,
      error: null,
      fetchOptionList: async (storeId) => {
        try {
          set({ loading: true }, false, "set_fetch_option_loading");
          const { data, error } = await getOptionListByStoreId(storeId);

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
    { name: "useOptionTableData" },
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
