import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreList } from "../../type/store.type";
import { getStoreBySlug, getStoreListByUserId } from "../action/store.action";

export const useStoreData = create<IStoreList>()(
  devtools(
    (set) => ({
      storeList: [],
      storeCurrent: null,
      loading: false,
      error: null,
      setStoreCurrentBySlug: async (slug) => {
        try {
          // console.log(" =>>> fetch store current");
          set({ loading: true });
          const { data, error } = await getStoreBySlug(slug);
          if (error) {
            set({ error, storeCurrent: null, loading: false });
            // set({ storeList: [] });
            // set({ storeCurrent: null });
            return;
          }
          if (data) {
            set(
              { storeCurrent: data, loading: false, error: null },
              false,
              "setStoreBySlug",
            );
          }
        } catch (e) {
          set({
            error: HTTPErrorMessage.SERVER_ERROR,
            storeCurrent: null,
            loading: false,
          });
          // set({ storeList: [] });
          // set({ storeCurrent: null });
        }
        // finally {
        //   set({ loading: false });
        // }
      },
      setStoreListByUser: async (userId) => {
        set({ loading: true });
        const { data, error } = await getStoreListByUserId(userId);
        if (error) {
          set({ error, storeList: [], loading: false });
          // set({ storeList: [] });
          // set({ loading: false });
          return;
        }
        if (data) {
          set(
            { storeList: data, loading: false, error: null },
            false,
            "fetchStoreListByUser",
          );
        }
        // set({ loading: false });
      },
    }),
    { name: "useStoreData" },
  ),
);
