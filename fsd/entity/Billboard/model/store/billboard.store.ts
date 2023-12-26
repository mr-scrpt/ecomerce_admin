import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreBillboardList } from "../../type/store.type";
import {
  getBillboardListByStoreId,
  getBillboardListByStoreSlug,
} from "../action/billboard.action";

export const useBillboardList = create<IStoreBillboardList>()(
  devtools(
    (set) => ({
      billboardList: [],
      loading: false,
      error: null,
      fetchBillboardList: async (storeId: string) => {
        try {
          set({ loading: true }, false, "set_billboard_loading");
          const { data, error } = await getBillboardListByStoreSlug(storeId);
          if (error) {
            set({ error, billboardList: [] }, false, "set_billboard_error");
            return;
          }
          if (data) {
            set(
              { billboardList: data, error: null },
              false,
              "set_billboard_data",
            );
          }
        } catch (e) {
          set({
            error: HTTPErrorMessage.SERVER_ERROR,
            billboardList: [],
          });
        } finally {
          set({ loading: false }, false, "set_category_loading");
        }
      },
    }),
    { name: "useBillboardList" },
  ),
);
