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
      fetchStoreByUserIdAndCreateList: async (userId, storeSlug) => {
        const storeList = await articleAction.getStoreListByUserId(userId);
        const storeData = mapStoreSwitcherListData(storeList, storeSlug);
        console.log(" =>>>", storeData);

        const storeActive = storeData.groupItemList.find(
          (item) => item.slug === storeSlug,
        );

        set(
          { list: [storeData, storeSwitcherActionData], current: storeActive },
          false,
          "fetchStoreByUserIdAndCreateList",
        );
      },
    }),
    { name: "useStoreSwitcherData" },
  ),
);
