import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreBillboardTable } from "../../type/store.type";
import { billboardAction } from "@/fsd/entity/Billboard";
import { buildDate } from "@/fsd/shared/lib/formatDate";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

export const useBillboardTableData = create<IStoreBillboardTable>()(
  devtools(
    (set) => ({
      list: [],
      loading: false,
      error: null,
      fetchBillboardByStoreSlug: async (storeSlug) => {
        try {
          set({ loading: true });
          const { data, error } =
            await billboardAction.getBillboardListByStoreSlug(storeSlug);
          if (error) {
            set({ error });
            set({ list: [] });
            return;
          }

          set({
            list: data?.map((item) => ({
              id: item.id,
              name: item.name,
              createdAt: buildDate(item.createdAt),
            })),
          });
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ list: [] });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "useBillboardTableData" },
  ),
);
