import { Store } from "@prisma/client";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import prismaDB from "@/lib/prismadb";
import axios from "axios";

interface StoreStateI {
  data: Store | null;
  loading: boolean;
  error: string | null;
  fetchStore: (slug: string, userId: string) => void;
}

// export const useStoreStore = create<StoreStateI>()(
//   devtools(
//     immer((set) => ({
//       data: null,
//       loading: false,
//       error: null,
//       fetchStore: async (slug, userId) => {
//         set({ loading: true });
//         try {
//           const res = await prismaDB.store.findFirst({
//             where: {
//               slug,
//               userId,
//             },
//           });
//
//           set({ data: res });
//           return res;
//         } catch (e: any) {
//           set({ error: e?.message });
//         } finally {
//           set({ loading: false, error: null });
//         }
//       },
//     })),
//   ),
// );

interface StoreListStateI {
  data: Store[];
  loading: boolean;
  error: string | null;
  fetchStore: () => void;
}

export const useStoreListStore = create<StoreListStateI>()(
  devtools(
    immer((set, get) => ({
      data: [],
      loading: false,
      error: null,
      fetchStore: async () => {
        set({ loading: true });
        try {
          const res = await prismaDB.store.findMany({
            // where: {
            //   userId,
            // },
          });
          // const { data } = await axios.get("/api/store");

          // set(data);
          set({ data: res });
          console.log("state", get().data);
        } catch (e: any) {
          set({ error: e?.message });
          console.log("error", e);
        } finally {
          set({ loading: false, error: null });
        }
      },
    })),
  ),
);
