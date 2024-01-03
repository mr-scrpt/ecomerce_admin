import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ISizeRemove } from "../type/store.type";

export const useSizeRemove = create<ISizeRemove>()(
  devtools(
    (set) => ({
      sizeId: "",
      setId: (sizeId: string) => {
        set({ sizeId });
      },
      resetId: () => {
        set({ sizeId: "" });
      },
    }),
    { name: "useSizeRemove" },
  ),
);
