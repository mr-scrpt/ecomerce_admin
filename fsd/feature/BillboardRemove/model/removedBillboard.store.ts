import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreBillboardRemove } from "../type/store.type";

export const useBillboardRemove = create<IStoreBillboardRemove>()(
  devtools(
    (set) => ({
      billboardId: "",
      setId: (billboardId: string) => {
        set({ billboardId });
      },
      resetId: () => {
        set({ billboardId: "" });
      },
    }),
    { name: "useBillboardRemove" },
  ),
);
