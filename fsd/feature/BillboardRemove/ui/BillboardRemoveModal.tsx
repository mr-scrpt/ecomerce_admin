import { FC, HTMLAttributes, useCallback } from "react";
import { BillboardRemove } from "./BillboardRemove";
import { useBillboardRemove } from "../model/removedBillboard.store";
import { useShallow } from "zustand/react/shallow";
import { usePathname } from "next/navigation";

interface BillboardRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const BillboardRemoveModal: FC<BillboardRemoveModalProps> = (props) => {
  const { onClose } = props;
  const path = usePathname();

  const { billboardId, resetId } = useBillboardRemove(
    useShallow((state) => ({
      billboardId: state.billboardId,
      resetId: state.resetId,
    })),
  );

  const onSuccess = useCallback(() => {
    resetId();
    onClose();
  }, []);

  return (
    <BillboardRemove
      onSuccess={onSuccess}
      onCancel={onClose}
      billboardId={billboardId}
      onSuccesUrlRedirect={path}
    />
  );
};
