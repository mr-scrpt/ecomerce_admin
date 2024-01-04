import { create } from "zustand";
import { IStoreColorUpdate } from "../../type/store.type";
import { devtools } from "zustand/middleware";
import { IGetColorBySlugPayload, colorAction } from "@/fsd/entity/Color";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

export const useColorUpdate = create<IStoreColorUpdate>()(
  devtools(
    (set) => ({
      color: null,
      error: null,
      loading: false,
      resetColor: () => set({ color: null }),
      getColorCurrent: async (payload: IGetColorBySlugPayload) => {
        try {
          set({ loading: true }, false, "set_color_loading");
          const { data, error } = await colorAction.getColorBySlug(payload);
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
