import { FC, HTMLAttributes, useCallback } from "react";
import { StoreRemove } from "./StoreRemove";
import { useOrigin } from "@/fsd/shared/hook/useOrigin";
import { useStoreData } from "@/fsd/entity/Store";

interface StoreRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const StoreRemoveModal: FC<StoreRemoveModalProps> = (props) => {
  const { onClose } = props;
  const originUrl = useOrigin();
  const onSuccess = useCallback(() => {
    onClose();
  }, []);

  const { storeCurrent } = useStoreData(({ storeCurrent }) => ({
    storeCurrent,
  }));

  return (
    <>
      {storeCurrent && (
        <StoreRemove
          onSuccess={onSuccess}
          onCancel={onClose}
          onSuccesUrlRedirect={originUrl}
          storeId={storeCurrent.id}
        />
      )}
    </>
  );
};
