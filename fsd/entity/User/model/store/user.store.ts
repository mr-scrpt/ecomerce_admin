import { getUser } from "@/fsd/shared/modle/action/auth.action";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IUser } from "../type/store.type";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";

export const useUserData = create<IUser>()(
  devtools(
    (set) => ({
      user: null,
      error: null,
      loading: false,
      fetchUserId: async () => {
        try {
          set({ loading: true });
          const { data, error } = await getUser();
          if (error) {
            set({ error });
            set({ user: null });
            return;
          }
          if (data) {
            set({ user: data }, false, "setStoreBySlug");
          }
        } catch (e) {
          set({ error: HTTPErrorMessage.SERVER_ERROR });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "userData" },
  ),
);
