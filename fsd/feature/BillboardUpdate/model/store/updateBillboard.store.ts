import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { billboardAction } from "@/fsd/entity/Billboard";
import { IStoreBillboardUpdate } from "../../type/store.type";
import { IGetBillboardBySlugPayload } from "@/fsd/entity/Billboard";

export const useBillboardUpdate = create<IStoreBillboardUpdate>()(
  devtools(
    (set) => ({
      billboard: null,
      error: null,
      loading: false,
      resetBillboard: () =>
        set({ billboard: null }, false, "reset_billboard_data"),
      getBillboardCurrent: async (payload: IGetBillboardBySlugPayload) => {
        try {
          set({ loading: true }, false, "set_billboard_loading");
          const { data, error } =
            await billboardAction.getBillboardBySlug(payload);
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
