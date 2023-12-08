"use client";
import { StoreCreate } from "@/fsd/feature/StoreCreate/ui/StoreCreate";
import { useStoreModal } from "@/fsd/shared/hook/use-store-modal";
import { Modal } from "@/fsd/shared/ui/modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMoundted] = useState(false);

  const { isOpen, onOpen, onClose } = useStoreModal();

  // useEffect(() => {
  //   setIsMoundted(true);
  // }, []);
  //
  // if (!isMounted) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StoreCreate />
    </Modal>
  );
};
