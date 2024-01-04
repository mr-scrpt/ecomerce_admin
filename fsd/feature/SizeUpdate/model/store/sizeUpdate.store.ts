import { create } from "zustand";
import { IStoreSizeUpdate } from "../../type/store.type";
import { devtools } from "zustand/middleware";
import { sizeAction } from "@/fsd/entity/Size";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { IGetCategoryBySlugPayload } from "@/fsd/entity/Category";

export const useSizeUpdate = create<IStoreSizeUpdate>()(
  devtools(
    (set, get) => ({
      size: null,
      error: null,
      loading: false,
      resetSize: () => set({ size: null }),
      getSizeCurrent: async (payload: IGetCategoryBySlugPayload) => {
        try {
          set({ loading: true }, false, "set_size_loading");
          const { data, error } = await sizeAction.getSizeBySlug(payload);
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
