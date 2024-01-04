import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IColorRemove } from "../type/store.type";

export const useColorRemove = create<IColorRemove>()(
  devtools(
    (set) => ({
      colorId: "",
      setId: (colorId: string) => {
        set({ colorId });
      },
      resetId: () => {
        set({ colorId: "" });
      },
    }),
    { name: "useColorRemove" },
  ),
);
