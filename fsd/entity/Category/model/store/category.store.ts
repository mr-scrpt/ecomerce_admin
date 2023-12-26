import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  IStoreCategoryRemove,
  IStoreCategoryUpdate,
} from "../../type/store.type";
import { getCategory } from "../action/category.action";

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

export const useCategoryUpdate = create<IStoreCategoryUpdate>()(
  devtools(
    (set, get) => ({
      categoryId: "",
      category: null,
      error: null,
      loading: false,
      setId: (categoryId: string) => {
        set({ categoryId });
      },
      resetId: () => {
        set({ categoryId: "" });
      },
      resetCategory: () => set({ category: null }),
      getCategoryCurrent: async () => {
        try {
          set({ loading: true }, false, "set_category_loading");
          const categoryId = get().categoryId;
          const { data, error } = await getCategory(categoryId);
          if (error) {
            set({ error, category: null }, false, "set_category_error");
            return;
          }
          if (data) {
            set({ category: data, error: null }, false, "set_category_data");
          }
        } catch (e) {
        } finally {
          set({ loading: false }, false, "set_category_loading");
        }
      },
    }),
    { name: "useCategoryUpdate" },
  ),
);
