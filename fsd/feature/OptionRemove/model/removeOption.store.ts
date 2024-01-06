import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IOptionRemove } from "../type/store.type";

export const useOptionRemove = create<IOptionRemove>()(
  devtools(
    (set) => ({
      optionId: "",
      setId: (optionId: string) => {
        set({ optionId });
      },
      resetId: () => {
        set({ optionId: "" });
      },
    }),
    { name: "useOptionRemove" },
  ),
);
