import { useStoreData } from "@/fsd/entity/Store";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { ColorRemove } from "./ColorRemove";
import { useRouter } from "next/navigation";
import { useColorList, useColorRemove } from "@/fsd/entity/Color";

interface ColorRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const ColorRemoveModal: FC<ColorRemoveModalProps> = memo((props) => {
  const { onClose } = props;
  const router = useRouter();

  const { colorId, resetId } = useColorRemove(
    useShallow((state) => ({
      colorId: state.colorId,
      resetId: state.resetId,
    })),
  );

  const { getColor } = useColorList(
    useShallow((state) => ({
      getColor: state.fetchColorList,
    })),
  );
  const { slug } = useStoreData(
    useShallow((state) => ({ slug: state.storeCurrent?.slug })),
  );

  const onSuccess = useCallback(() => {
    resetId();
    onClose();
    router.refresh();
    getColor(slug!);
  }, [resetId, onClose, router, getColor, slug]);

  return (
    <ColorRemove onSuccess={onSuccess} onCancel={onClose} colorId={colorId} />
  );
});
