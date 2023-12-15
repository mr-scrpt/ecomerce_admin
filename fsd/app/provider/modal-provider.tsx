"use client";
import { useStoreModal } from "@/fsd/feature/ModalManager";
import { useStoreRemoveModal } from "@/fsd/feature/ModalManager/model/store/modal.store";
import { StoreCreate } from "@/fsd/feature/StoreCreate/ui/StoreCreate";
import { StoreRemove } from "@/fsd/feature/StoreRemove";
import { useOrigin } from "@/fsd/shared/hook/useOrigin";
import { Modal } from "@/fsd/shared/ui/modal";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export const ModalProvider = () => {
  // const [isMounted, setIsMoundted] = useState(false);

  const { isOpenCreate, onCloseCreate } = useStoreModal(
    useShallow((state) => ({
      isOpenCreate: state.isOpen,
      onCloseCreate: state.onClose,
    })),
  );

  const { isOpenRemove, onCloseRemove } = useStoreRemoveModal(
    useShallow((state) => ({
      isOpenRemove: state.isOpen,
      onCloseRemove: state.onClose,
    })),
  );

  const originUrl = useOrigin();

  // useEffect(() => {
  //   setIsMoundted(true);
  // }, []);
  //
  // if (!isMounted) return null;

  return (
    <>
      <Modal
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        title="Create new store"
        description="This action has bean created new store"
      >
        <StoreCreate onClose={onCloseCreate} />
      </Modal>
      <Modal
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        title="Are you sure remov store?"
        description="This action cannot be undone."
      >
        <StoreRemove onClose={onCloseRemove} onSuccesUrlRedirect={originUrl} />
      </Modal>
    </>
  );
};
