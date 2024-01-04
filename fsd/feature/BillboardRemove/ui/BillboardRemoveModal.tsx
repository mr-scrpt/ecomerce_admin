import { useStoreData } from "@/fsd/entity/Store";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useBillboardRemove } from "../model/removedBillboard.store";
import { BillboardRemove } from "./BillboardRemove";
import { useRouter } from "next/navigation";
import { useBillboardList } from "@/fsd/entity/Billboard";

interface BillboardRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const BillboardRemoveModal: FC<BillboardRemoveModalProps> = memo(
  (props) => {
    const { onClose } = props;
    const router = useRouter();

    const { billboardId, resetId } = useBillboardRemove(
      useShallow((state) => ({
        billboardId: state.billboardId,
        resetId: state.resetId,
      })),
    );

    const { getBillboard } = useBillboardList(
      useShallow((state) => ({
        getBillboard: state.fetchBillboardList,
      })),
    );
    const { slug } = useStoreData(
      useShallow((state) => ({ slug: state.storeCurrent?.slug })),
    );

    const onSuccess = useCallback(() => {
      resetId();
      onClose();
      router.refresh();
      getBillboard(slug!);
    }, [resetId, onClose, router, getBillboard, slug]);

    return (
      <BillboardRemove
        onSuccess={onSuccess}
        onCancel={onClose}
        billboardId={billboardId}
      />
    );
  },
);
