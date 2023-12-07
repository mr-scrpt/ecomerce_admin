"use client";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { useStoreModal } from "@/fsd/shared/hook/use-store-modal";
import { useEffect } from "react";

const StartupPage = () => {
  console.log(" =>>> StartupPage");
  const { onOpen, isOpen } = useStoreModal();
  useUserData();
  // const isOpen = useStoreModal((s) => s.isOpen);
  // const onOpen = useStoreModal((s) => s.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);
  return null;
};

export default StartupPage;
