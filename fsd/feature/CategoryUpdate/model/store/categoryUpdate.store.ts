import { create } from "zustand";
import { IStoreCategoryUpdate } from "../../type/store.type";
import { devtools } from "zustand/middleware";
import { categoryAction } from "@/fsd/entity/Category";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

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
          const { data, error } = await categoryAction.getCategory(categoryId);
          if (error) {
            set({ error, category: null }, false, "set_category_error");
            return;
          }
          if (data) {
            set({ category: data, error: null }, false, "set_category_data");
          }
        } catch (e) {
          set({
            error: HTTPErrorMessage.SERVER_ERROR,
            category: null,
          });
        } finally {
          set({ loading: false }, false, "set_category_loading");
        }
      },
    }),
    { name: "useCategoryUpdate" },
  ),
);
