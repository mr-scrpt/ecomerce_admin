import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreSwitcher } from "../../type/store.type";
import { articleAction } from "@/fsd/entity/Store";
import { mapStoreSwitcherListData } from "../../lib/util";
import { storeSwitcherActionData } from "../../data/action.data";

export const useStoreSwitcherData = create<IStoreSwitcher>()(
  devtools(
    (set) => ({
      list: [],
      current: null,
      loading: false,
      error: null,
      fetchStoreByUserIdAndCreateList: async (userId, storeSlug) => {
        try {
          console.log(" =>>> start");
          set({ loading: true });
          const storeList = await articleAction.getStoreListByUserId(userId);
          const storeData = mapStoreSwitcherListData(storeList, storeSlug);

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
          set({ error: e as string });
        } finally {
          console.log(" =>>> finally");
          set({ loading: false });
        }
      },
    }),
    { name: "useStoreSwitcherData" },
  ),
);
