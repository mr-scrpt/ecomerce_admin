"use client";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { useEffect } from "react";

export const UserProvider = () => {
  const { fetchUserId } = useUserData();
  useEffect(() => {
    console.log(" =>>>fetch user");
    fetchUserId();
  }, []);
  return null;
};
