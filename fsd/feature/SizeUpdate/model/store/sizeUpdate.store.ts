import { create } from "zustand";
import { IStoreSizeUpdate } from "../../type/store.type";
import { devtools } from "zustand/middleware";
import { sizeAction } from "@/fsd/entity/Size";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

export const useSizeUpdate = create<IStoreSizeUpdate>()(
  devtools(
    (set, get) => ({
      sizeId: "",
      size: null,
      error: null,
      loading: false,
      setId: (sizeId: string) => {
        set({ sizeId });
      },
      resetId: () => {
        set({ sizeId: "" });
      },
      resetSize: () => set({ size: null }),
      getSizeCurrent: async () => {
        try {
          set({ loading: true }, false, "set_size_loading");
          const sizeId = get().sizeId;
          const { data, error } = await sizeAction.getSize(sizeId);
          if (error) {
            set({ error, size: null }, false, "set_size_error");
            return;
          }
          if (data) {
            set({ size: data, error: null }, false, "set_size_data");
          }
        } catch (e) {
          set({
            error: HTTPErrorMessage.SERVER_ERROR,
            size: null,
          });
        } finally {
          set({ loading: false }, false, "set_size_loading");
        }
      },
    }),
    { name: "useSizeUpdate" },
  ),
);
