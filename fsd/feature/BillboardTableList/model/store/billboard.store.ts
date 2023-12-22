import { billboardAction } from "@/fsd/entity/Billboard";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { buildBillboardRow } from "../../lib/buildBillboardRow";
import { IStoreBillboardTable } from "../../type/store.type";

export const useBillboardTableData = create<IStoreBillboardTable>()(
  devtools(
    (set) => ({
      list: [],
      loading: false,
      error: null,
      fetchBillboardListByStoreSlug: async (storeSlug) => {
        try {
          set({ loading: true }, false, "set_fetch_billboard_loading");
          const { data, error } =
            await billboardAction.getBillboardListByStoreSlug(storeSlug);
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
