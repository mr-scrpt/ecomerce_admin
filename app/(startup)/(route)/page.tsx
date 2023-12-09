"use client";
import { useStoreModal } from "@/fsd/feature/ModalManager";
import { useEffect } from "react";

const StartupPage = () => {
  const { onOpen, isOpen } = useStoreModal();
  console.log(" =>>> start up");
  // useUserData();
  // const isOpen = useStoreModal((s) => s.isOpen);
  // const onOpen = useStoreModal((s) => s.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);
  return null;
};

export default StartupPage;
