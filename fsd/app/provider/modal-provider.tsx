"use client";
import { useStoreModal } from "@/fsd/feature/ModalManager";
import { useStoreRemoveModal } from "@/fsd/feature/ModalManager/model/store/modal.store";
import { StoreCreate } from "@/fsd/feature/StoreCreate/ui/StoreCreate";
import { StoreRemove } from "@/fsd/feature/StoreRemove";
import { Modal } from "@/fsd/shared/ui/modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  // const [isMounted, setIsMoundted] = useState(false);

  const { isOpen, onClose } = useStoreModal(({ isOpen, onClose }) => ({
    isOpen,
    onClose,
  }));

  const { isOpen: isOpenRemove, onClose: onCloseRemove } = useStoreRemoveModal(
    ({ isOpen, onClose }) => ({ isOpen, onClose }),
  );

  // useEffect(() => {
  //   setIsMoundted(true);
  // }, []);
  //
  // if (!isMounted) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create new store"
        description="This action has bean created new store"
      >
        <StoreCreate />
      </Modal>
      <Modal
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        title="Are you sure remov store?"
        description="This action cannot be undone."
      >
        <StoreRemove onClose={onCloseRemove} />
      </Modal>
    </>
  );
};
