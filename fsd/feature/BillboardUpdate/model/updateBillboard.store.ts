import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreBillboardUpdate } from "../type/store.type";
import { billboardAction } from "@/fsd/entity/Billboard";

export const useBillboardUpdate = create<IStoreBillboardUpdate>()(
  devtools(
    (set, get) => ({
      billboardId: "",
      billboard: null,
      error: null,
      loading: false,
      setId: (billboardId: string) => {
        set({ billboardId });
      },
      resetId: () => {
        set({ billboardId: "" });
      },
      resetBillboard: () => set({ billboard: null }),
      getBillboardCurrent: async () => {
        try {
          set({ loading: true }, false, "set_billboard_loading");
          const billboardId = get().billboardId;
          const { data, error } =
            await billboardAction.getBillboard(billboardId);
          if (error) {
            set({ error, billboard: null }, false, "set_billboard_error");
            return;
          }
          if (data) {
            set({ billboard: data, error: null }, false, "set_billboard_data");
          }
        } catch (e) {
        } finally {
          set({ loading: false }, false, "set_billboard_loading");
        }
      },
    }),
    { name: "useBillboardUpdate" },
  ),
);
