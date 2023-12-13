"use client";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const UserProvider = () => {
  // const { fetchUserId } = useUserData();
  const { fetchUserId } = useUserData(
    useShallow((state) => ({
      user: state.user,
      fetchUserId: state.fetchUserId,
    })),
  );
  useEffect(() => {
    fetchUserId();
  }, []);

  return null;
};
