import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
