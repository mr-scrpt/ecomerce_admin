import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  IStoreBillboardList,
  IStoreBillboardTable,
} from "../../type/store.type";
import { getBillboardListByStoreSlug } from "../action/billboard.action";
import { buildBillboardRow } from "../../lib/buildBillboardRow";

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

export const useBillboardTableData = create<IStoreBillboardTable>()(
  devtools(
    (set) => ({
      list: [],
      loading: false,
      error: null,
      fetchBillboardListByStoreSlug: async (storeSlug) => {
        try {
          set({ loading: true }, false, "set_fetch_billboard_loading");
          console.log(" =>>> fetchBillboardListByStoreSlug");
          const { data, error } = await getBillboardListByStoreSlug(storeSlug);
          if (error) {
            set({ error }, false, "set_fetch_billboard_error");
            set({ list: [] });
            return;
          }

          set(
            {
              list: data?.map((item) => buildBillboardRow(item)),
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
    { name: "useBillboardTableData" },
  ),
);
