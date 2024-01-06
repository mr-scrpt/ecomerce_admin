import { create } from "zustand";
import { IStoreOptionUpdate } from "../../type/store.type";
import { devtools } from "zustand/middleware";
import { IGetOptionBySlugPayload, optionAction } from "@/fsd/entity/Option";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

export const useOptionUpdate = create<IStoreOptionUpdate>()(
  devtools(
    (set) => ({
      option: null,
      error: null,
      loading: false,
      resetOption: () => set({ option: null }),
      getOptionCurrent: async (payload: IGetOptionBySlugPayload) => {
        try {
          set({ loading: true }, false, "set_option_loading");
          const { data, error } = await optionAction.getOptionBySlug(payload);
          if (error) {
            set({ error, option: null }, false, "set_option_error");
            return;
          }
          if (data) {
            set({ option: data, error: null }, false, "set_option_data");
          }
        } catch (e) {
          set({
            error: HTTPErrorMessage.SERVER_ERROR,
            option: null,
          });
        } finally {
          set({ loading: false }, false, "set_option_loading");
        }
      },
    }),
    { name: "useOptionUpdate" },
  ),
);
