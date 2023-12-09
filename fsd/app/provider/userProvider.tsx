"use client";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { memo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const UserProvider = memo(() => {
  // const { fetchUserId } = useUserData();
  // console.log(" =>>>&&&&& provider");
  const { fetchUserId } = useUserData(
    useShallow((state) => ({
      // user: state.user,
      fetchUserId: state.fetchUserId,
    })),
  );
  useEffect(() => {
    console.log(" fetch user provider !");
    fetchUserId();
  }, []);

  return null;
});
