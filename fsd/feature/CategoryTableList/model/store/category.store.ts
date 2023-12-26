import { billboardAction } from "@/fsd/entity/Category";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { buildCategoryRow } from "../../lib/buildCategoryRow";
import { IStoreCategoryTable } from "../../type/store.type";

export const useCategoryTableData = create<IStoreCategoryTable>()(
  devtools(
    (set) => ({
      list: [],
      loading: false,
      error: null,
      fetchCategoryListByStoreSlug: async (storeSlug) => {
        try {
          set({ loading: true }, false, "set_fetch_billboard_loading");
          const { data, error } =
            await billboardAction.getCategoryListByStoreSlug(storeSlug);

          if (error) {
            set({ error }, false, "set_fetch_billboard_error");
            set({ list: [] });
            return;
          }

          set(
            {
              list: data?.map((item) => buildCategoryRow(item)),
            },
            false,
            "set_fetch_billboard_data",
          );
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ list: [] });
        } finally {
          set({ loading: false }, false, "set_fetch_billboard_loading");
        }
      },
    }),
    { name: "useCategoryTableData" },
  ),
);
