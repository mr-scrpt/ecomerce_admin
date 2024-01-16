import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  IStoreCategoryList,
  IStoreCategoryRemove,
} from "../../type/store.type";
import {
  getCategory,
  getCategoryListByStoreSlug,
} from "../action/category.action";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

export const useCategoryList = create<IStoreCategoryList>()(
  devtools(
    (set) => ({
      categoryList: [],
      loading: false,
      error: null,
      fetchCategoryList: async (storeSlug) => {
        try {
          set({ loading: true }, false, "set_fetch_billboard_loading");
          const { data, error } = await getCategoryListByStoreSlug(storeSlug);

          if (error) {
            set({ error }, false, "set_fetch_billboard_error");
            set({ categoryList: [] });
            return;
          }

          if (data) {
            set(
              {
                categoryList: data,
                error: null,
              },
              false,
              "set_fetch_category_data",
            );
          }
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ categoryList: [] });
        } finally {
          set({ loading: false }, false, "set_fetch_billboard_loading");
        }
      },
    }),
    { name: "useCategoryTableData" },
  ),
);
export const useCategoryRemove = create<IStoreCategoryRemove>()(
  devtools(
    (set) => ({
      categoryId: "",
      setId: (categoryId: string) => {
        set({ categoryId });
      },
      resetId: () => {
        set({ categoryId: "" });
      },
    }),
    { name: "useCategoryRemove" },
  ),
);

// export const useCategoryUpdate = create<IStoreCategoryUpdate>()(
//   devtools(
//     (set, get) => ({
//       categoryId: "",
//       category: null,
//       error: null,
//       loading: false,
//       setId: (categoryId: string) => {
//         set({ categoryId });
//       },
//       resetId: () => {
//         set({ categoryId: "" });
//       },
//       resetCategory: () => set({ category: null }),
//       getCategoryCurrent: async () => {
//         try {
//           set({ loading: true }, false, "set_category_loading");
//           const categoryId = get().categoryId;
//           const { data, error } = await getCategory(categoryId);
//           if (error) {
//             set({ error, category: null }, false, "set_category_error");
//             return;
//           }
//           if (data) {
//             set({ category: data, error: null }, false, "set_category_data");
//           }
//         } catch (e) {
//           set({
//             error: HTTPErrorMessage.SERVER_ERROR,
//             category: null,
//           });
//         } finally {
//           set({ loading: false }, false, "set_category_loading");
//         }
//       },
//     }),
//     { name: "useCategoryUpdate" },
//   ),
// );