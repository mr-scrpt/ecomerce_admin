"use client";
import { BillboardRemoveModal } from "@/fsd/feature/BillboardRemove";
import { useStoreModal } from "@/fsd/feature/ModalManager";
import {
  useBillboardRemoveModal,
  useStoreRemoveModal,
} from "@/fsd/feature/ModalManager/model/store/modal.store";
import { StoreCreate } from "@/fsd/feature/StoreCreate/ui/StoreCreate";
import { StoreCreateModal } from "@/fsd/feature/StoreCreate/ui/StoreCreateModal";
import { StoreRemoveModal } from "@/fsd/feature/StoreRemove";
import { Modal } from "@/fsd/shared/ui/modal";
import { useShallow } from "zustand/react/shallow";

export const ModalProvider = () => {
  // const [isMounted, setIsMoundted] = useState(false);

  const { isOpenStoreCreate, onCloseStoreCreate } = useStoreModal(
    useShallow((state) => ({
      isOpenStoreCreate: state.isOpen,
      onCloseStoreCreate: state.onClose,
    })),
  );

  const { isOpenStoreRemove, onCloseStoreRemove } = useStoreRemoveModal(
    useShallow((state) => ({
      isOpenStoreRemove: state.isOpen,
      onCloseStoreRemove: state.onClose,
    })),
  );

  const { isOpenBillboardRemove, onCloseBillboardRemove } =
    useBillboardRemoveModal(
      useShallow((state) => ({
        isOpenBillboardRemove: state.isOpen,
        onCloseBillboardRemove: state.onClose,
      })),
    );

  return (
    <>
      <Modal
        isOpen={isOpenStoreCreate}
        onClose={onCloseStoreCreate}
        title="Create new store"
        description="This action has bean created new store"
      >
        <StoreCreateModal onClose={onCloseStoreCreate} />
      </Modal>
      <Modal
        isOpen={isOpenStoreRemove}
        onClose={onCloseStoreRemove}
        title="Are you sure remove store?"
        description="This action cannot be undone."
      >
        <StoreRemoveModal onClose={onCloseStoreRemove} />
      </Modal>
      <Modal
        isOpen={isOpenBillboardRemove}
        onClose={onCloseBillboardRemove}
        title="Are you sure remove billboard?"
        description="This action cannot be undone."
      >
        <BillboardRemoveModal onClose={onCloseBillboardRemove} />
      </Modal>
    </>
  );
};
