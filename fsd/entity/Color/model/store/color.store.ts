import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreColorList, IStoreColorRemove } from "../../type/store.type";
import { getColorListByStoreSlug } from "../action/color.action";

export const useColorList = create<IStoreColorList>()(
  devtools(
    (set) => ({
      colorList: [],
      loading: false,
      error: null,
      fetchColorList: async (storeSlug) => {
        try {
          set({ loading: true }, false, "set_fetch_color_loading");
          const { data, error } = await getColorListByStoreSlug(storeSlug);

          if (error) {
            set({ error }, false, "set_fetch_color_error");
            set({ colorList: [] });
            return;
          }

          if (data) {
            set(
              {
                colorList: data,
                error: null,
              },
              false,
              "set_fetch_color_data",
            );
          }
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ colorList: [] });
        } finally {
          set({ loading: false }, false, "set_fetch_color_loading");
        }
      },
    }),
    { name: "useColorTableData" },
  ),
);
export const useColorRemove = create<IStoreColorRemove>()(
  devtools(
    (set) => ({
      colorId: "",
      setId: (colorId: string) => {
        set({ colorId });
      },
      resetId: () => {
        set({ colorId: "" });
      },
    }),
    { name: "useColorRemove" },
  ),
);

// export const useColorUpdate = create<IStoreColorUpdate>()(
//   devtools(
//     (set, get) => ({
//       colorId: "",
//       color: null,
//       error: null,
//       loading: false,
//       setId: (colorId: string) => {
//         set({ colorId });
//       },
//       resetId: () => {
//         set({ colorId: "" });
//       },
//       resetColor: () => set({ color: null }),
//       getColorCurrent: async () => {
//         try {
//           set({ loading: true }, false, "set_color_loading");
//           const colorId = get().colorId;
//           const { data, error } = await getColor(colorId);
//           if (error) {
//             set({ error, color: null }, false, "set_color_error");
//             return;
//           }
//           if (data) {
//             set({ color: data, error: null }, false, "set_color_data");
//           }
//         } catch (e) {
//           set({
//             error: HTTPErrorMessage.SERVER_ERROR,
//             color: null,
//           });
//         } finally {
//           set({ loading: false }, false, "set_color_loading");
//         }
//       },
//     }),
//     { name: "useColorUpdate" },
//   ),
// );
