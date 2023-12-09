"use client";
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
        console.log(" =>>>client fetch user:");

        try {
          set({ loading: true }, false, "set_user_loading");
          const { data, error } = await getUser();
          if (error) {
            set({ error, user: null, loading: false }, false, "set_user_error");
            // set({ user: null }, false, "reset_user_data");
            return;
          }
          if (data) {
            set(
              { user: data, loading: false, error: null },
              false,
              "set_user_data",
            );
          }
        } catch (e) {
          set(
            { error: HTTPErrorMessage.SERVER_ERROR, loading: false },
            false,
            "set_user_error",
          );
        }
        // finally {
        //   set({ loading: false }, false, "reset_user_loading");
        // }
      },
    }),
    { name: "userData" },
  ),
);
