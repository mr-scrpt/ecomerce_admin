import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IStoreCategoryRemove } from "../type/store.type";

export const useCategoryRemove = create<IStoreCategoryRemove>()(
  devtools(
    (set) => ({
      categoryId: "",
      setId: (categoryId: string) => {
        set({ categoryId });
      },
      resetId: () => {
        set({ categoryId: "" });
      },
    }),
    { name: "useCategoryRemove" },
  ),
);
