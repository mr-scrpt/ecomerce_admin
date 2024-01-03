import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreSizeList, IStoreSizeRemove } from "../../type/store.type";
import { getSizeListByStoreSlug } from "../action/size.action";

export const useSizeList = create<IStoreSizeList>()(
  devtools(
    (set) => ({
      sizeList: [],
      loading: false,
      error: null,
      fetchSizeList: async (storeSlug) => {
        try {
          set({ loading: true }, false, "set_fetch_size_loading");
          const { data, error } = await getSizeListByStoreSlug(storeSlug);

          if (error) {
            set({ error }, false, "set_fetch_size_error");
            set({ sizeList: [] });
            return;
          }

          if (data) {
            set(
              {
                sizeList: data,
                error: null,
              },
              false,
              "set_fetch_size_data",
            );
          }
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ sizeList: [] });
        } finally {
          set({ loading: false }, false, "set_fetch_size_loading");
        }
      },
    }),
    { name: "useSizeTableData" },
  ),
);
export const useSizeRemove = create<IStoreSizeRemove>()(
  devtools(
    (set) => ({
      sizeId: "",
      setId: (sizeId: string) => {
        set({ sizeId });
      },
      resetId: () => {
        set({ sizeId: "" });
      },
    }),
    { name: "useSizeRemove" },
  ),
);

// export const useSizeUpdate = create<IStoreSizeUpdate>()(
//   devtools(
//     (set, get) => ({
//       sizeId: "",
//       size: null,
//       error: null,
//       loading: false,
//       setId: (sizeId: string) => {
//         set({ sizeId });
//       },
//       resetId: () => {
//         set({ sizeId: "" });
//       },
//       resetSize: () => set({ size: null }),
//       getSizeCurrent: async () => {
//         try {
//           set({ loading: true }, false, "set_size_loading");
//           const sizeId = get().sizeId;
//           const { data, error } = await getSize(sizeId);
//           if (error) {
//             set({ error, size: null }, false, "set_size_error");
//             return;
//           }
//           if (data) {
//             set({ size: data, error: null }, false, "set_size_data");
//           }
//         } catch (e) {
//           set({
//             error: HTTPErrorMessage.SERVER_ERROR,
//             size: null,
//           });
//         } finally {
//           set({ loading: false }, false, "set_size_loading");
//         }
//       },
//     }),
//     { name: "useSizeUpdate" },
//   ),
// );
