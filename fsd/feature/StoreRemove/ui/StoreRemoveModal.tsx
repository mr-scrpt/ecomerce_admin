import { FC, HTMLAttributes, memo, useCallback } from "react";
import { StoreRemove } from "./StoreRemove";
import { useOrigin } from "@/fsd/shared/hook/useOrigin";
import { useStoreData } from "@/fsd/entity/Store";
import { useRouter } from "next/navigation";

interface StoreRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const StoreRemoveModal: FC<StoreRemoveModalProps> = memo((props) => {
  const { onClose } = props;
  const originUrl = useOrigin();
  const router = useRouter();

  const onSuccess = useCallback(() => {
    onClose();
    router.replace(originUrl);
  }, [router, originUrl, onClose]);

  const { storeCurrent } = useStoreData(({ storeCurrent }) => ({
    storeCurrent,
  }));

  return (
    <>
      {storeCurrent && (
        <StoreRemove
          onSuccess={onSuccess}
          onCancel={onClose}
          storeId={storeCurrent.id}
        />
      )}
    </>
  );
});
