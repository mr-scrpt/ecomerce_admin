import { create } from "zustand";
import { IStoreColorUpdate } from "../../type/store.type";
import { devtools } from "zustand/middleware";
import { colorAction } from "@/fsd/entity/Color";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

export const useColorUpdate = create<IStoreColorUpdate>()(
  devtools(
    (set, get) => ({
      colorId: "",
      color: null,
      error: null,
      loading: false,
      setId: (colorId: string) => {
        set({ colorId });
      },
      resetId: () => {
        set({ colorId: "" });
      },
      resetColor: () => set({ color: null }),
      getColorCurrent: async () => {
        try {
          set({ loading: true }, false, "set_color_loading");
          const colorId = get().colorId;
          const { data, error } = await colorAction.getColor(colorId);
          if (error) {
            set({ error, color: null }, false, "set_color_error");
            return;
          }
          if (data) {
            set({ color: data, error: null }, false, "set_color_data");
          }
        } catch (e) {
          set({
            error: HTTPErrorMessage.SERVER_ERROR,
            color: null,
          });
        } finally {
          set({ loading: false }, false, "set_color_loading");
        }
      },
    }),
    { name: "useColorUpdate" },
  ),
);
