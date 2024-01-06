import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreOptionList, IStoreOptionRemove } from "../../type/store.type";
import { getOptionListByStoreSlug } from "../action/option.action";

export const useOptionList = create<IStoreOptionList>()(
  devtools(
    (set) => ({
      optionList: [],
      loading: false,
      error: null,
      fetchOptionList: async (storeSlug) => {
        try {
          set({ loading: true }, false, "set_fetch_option_loading");
          const { data, error } = await getOptionListByStoreSlug(storeSlug);

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

// export const useOptionUpdate = create<IStoreOptionUpdate>()(
//   devtools(
//     (set, get) => ({
//       optionId: "",
//       option: null,
//       error: null,
//       loading: false,
//       setId: (optionId: string) => {
//         set({ optionId });
//       },
//       resetId: () => {
//         set({ optionId: "" });
//       },
//       resetOption: () => set({ option: null }),
//       getOptionCurrent: async () => {
//         try {
//           set({ loading: true }, false, "set_option_loading");
//           const optionId = get().optionId;
//           const { data, error } = await getOption(optionId);
//           if (error) {
//             set({ error, option: null }, false, "set_option_error");
//             return;
//           }
//           if (data) {
//             set({ option: data, error: null }, false, "set_option_data");
//           }
//         } catch (e) {
//           set({
//             error: HTTPErrorMessage.SERVER_ERROR,
//             option: null,
//           });
//         } finally {
//           set({ loading: false }, false, "set_option_loading");
//         }
//       },
//     }),
//     { name: "useOptionUpdate" },
//   ),
// );
