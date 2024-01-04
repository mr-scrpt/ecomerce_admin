import { create } from "zustand";
import { IStoreCategoryUpdate } from "../../type/store.type";
import { devtools } from "zustand/middleware";
import { categoryAction } from "@/fsd/entity/Category";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { IGetCategoryBySlugPayload } from "@/fsd/entity/Category";

export const useCategoryUpdate = create<IStoreCategoryUpdate>()(
  devtools(
    (set, get) => ({
      category: null,
      error: null,
      loading: false,
      resetCategory: () => set({ category: null }),
      getCategoryCurrent: async (payload: IGetCategoryBySlugPayload) => {
        try {
          set({ loading: true }, false, "set_category_loading");
          const { data, error } =
            await categoryAction.getCategoryBySlug(payload);
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
