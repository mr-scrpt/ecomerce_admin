import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreSwitcher } from "../../type/store.type";
import { storeAction } from "@/fsd/entity/Store";
import { mapStoreSwitcherListData } from "../../lib/util";
import { storeSwitcherActionData } from "../../data/action.data";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

export const useStoreSwitcherData = create<IStoreSwitcher>()(
  devtools(
    (set) => ({
      list: [],
      current: null,
      loading: false,
      error: null,
      fetchStoreByUserIdAndCreateList: async (userId, storeSlug) => {
        try {
          set({ loading: true });
          const { data, error } =
            await storeAction.getStoreListByUserId(userId);
          if (error || !data) {
            set({ error });
            set({ list: [] });
            set({ current: null });
            return;
          }
          // if (!data) {
          //   set({ list: [] });
          //   return;
          // }
          const storeData = mapStoreSwitcherListData(data, storeSlug);

          const storeActive = storeData.groupItemList.find(
            (item) => item.slug === storeSlug,
          );

          set(
            {
              list: [storeData, storeSwitcherActionData],
              current: storeActive,
            },
            false,
            "fetchStoreByUserIdAndCreateList",
          );
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
          set({ list: [] });
          set({ current: null });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "useStoreSwitcherData" },
  ),
);
