"use client";
import { BillboardRemoveModal } from "@/fsd/feature/BillboardRemove";
import { CategoryRemoveModal } from "@/fsd/feature/CategoryRemove";
import { ColorRemoveModal } from "@/fsd/feature/ColorRemove";
import {
  useColorRemoveModal,
  useSizeRemoveModal,
  useStoreModal,
} from "@/fsd/feature/ModalManager";
import {
  useBillboardRemoveModal,
  useCategoryRemoveModal,
  useStoreRemoveModal,
} from "@/fsd/feature/ModalManager";
import { SizeRemoveModal } from "@/fsd/feature/SizeRemove";
import { StoreCreateModal } from "@/fsd/feature/StoreCreate";
import { StoreRemoveModal } from "@/fsd/feature/StoreRemove";
import { Modal } from "@/fsd/shared/ui/modal";
import { useShallow } from "zustand/react/shallow";

export const ModalProvider = () => {
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

  const { isOpenCategoryRemove, onCloseCategoryRemove } =
    useCategoryRemoveModal(
      useShallow((state) => ({
        isOpenCategoryRemove: state.isOpen,
        onCloseCategoryRemove: state.onClose,
      })),
    );

  const { isOpenSizeRemove, onCloseSizeRemove } = useSizeRemoveModal(
    useShallow((state) => ({
      isOpenSizeRemove: state.isOpen,
      onCloseSizeRemove: state.onClose,
    })),
  );

  const { isOpenColorRemove, onCloseColorRemove } = useColorRemoveModal(
    useShallow((state) => ({
      isOpenColorRemove: state.isOpen,
      onCloseColorRemove: state.onClose,
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

      <Modal
        isOpen={isOpenCategoryRemove}
        onClose={onCloseCategoryRemove}
        title="Are you sure remove category?"
        description="This action cannot be undone."
      >
        <CategoryRemoveModal onClose={onCloseCategoryRemove} />
      </Modal>

      <Modal
        isOpen={isOpenSizeRemove}
        onClose={onCloseSizeRemove}
        title="Are you sure remove size?"
        description="This action cannot be undone."
      >
        <SizeRemoveModal onClose={onCloseSizeRemove} />
      </Modal>

      <Modal
        isOpen={isOpenColorRemove}
        onClose={onCloseColorRemove}
        title="Are you sure remove color?"
        description="This action cannot be undone."
      >
        <ColorRemoveModal onClose={onCloseColorRemove} />
      </Modal>
    </>
  );
};
