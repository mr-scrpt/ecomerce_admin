import { useStoreData } from "@/fsd/entity/Store";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { SizeRemove } from "./SizeRemove";
import { useRouter } from "next/navigation";
import { useSizeList, useSizeRemove } from "@/fsd/entity/Size";

interface SizeRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const SizeRemoveModal: FC<SizeRemoveModalProps> = memo((props) => {
  const { onClose } = props;
  const router = useRouter();

  const { sizeId, resetId } = useSizeRemove(
    useShallow((state) => ({
      sizeId: state.sizeId,
      resetId: state.resetId,
    })),
  );

  const { getSize } = useSizeList(
    useShallow((state) => ({
      getSize: state.fetchSizeList,
    })),
  );
  const { slug } = useStoreData(
    useShallow((state) => ({ slug: state.storeCurrent?.slug })),
  );

  const onSuccess = useCallback(() => {
    resetId();
    onClose();
    router.refresh();
    getSize(slug!);
  }, [resetId, onClose, router, getSize, slug]);

  return (
    <SizeRemove onSuccess={onSuccess} onCancel={onClose} sizeId={sizeId} />
  );
});
