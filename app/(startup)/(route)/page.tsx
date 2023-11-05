// "use client";
import { useStoreModal } from "@/hook/use-store-modal";
// import { useEffect } from "react";

const StartupPage = () => {
  const { onOpen, isOpen } = useStoreModal();
  // const isOpen = useStoreModal((s) => s.isOpen);
  // const onOpen = useStoreModal((s) => s.onOpen);

  // useEffect(() => {
  //   if (!isOpen) onOpen();
  // }, [isOpen, onOpen]);
  return null;
};

export default StartupPage;
