"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IUser } from "../type/store.type";
import { HTTPErrorMessage } from "@/fsd/shared/type/httpErrorMessage";
import { authAction } from "@/fsd/shared/model/action";

export const useUserData = create<IUser>()(
  devtools(
    (set) => ({
      user: null,
      error: null,
      loading: false,
      fetchUserId: async () => {
        try {
          set({ loading: true }, false, "set_user_loading");
          const { data, error } = await authAction.getAuthUser();

          if (error) {
            set({ error, user: null }, false, "set_user_error");
            return;
          }
          if (data) {
            set({ user: data, error: null }, false, "set_user_data");
          }
        } catch (e) {
          set(
            { error: HTTPErrorMessage.SERVER_ERROR },
            false,
            "set_user_error",
          );
        } finally {
          set({ loading: false }, false, "reset_user_loading");
        }
      },
    }),
    { name: "userData" },
  ),
);
