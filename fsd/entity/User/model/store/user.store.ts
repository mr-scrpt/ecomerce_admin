import { create } from "zustand";
import { getUserId } from "../action/user.action";
import { devtools } from "zustand/middleware";

interface IUser {
  userId: string | null;
  fetchUserId: () => void;
}

export const useUserData = create<IUser>()(
  devtools(
    (set) => ({
      userId: null,
      fetchUserId: async () => {
        const userId = await getUserId();
        set({ userId }, false, "getUserId");
      },
    }),
    { name: "userData" },
  ),
);
