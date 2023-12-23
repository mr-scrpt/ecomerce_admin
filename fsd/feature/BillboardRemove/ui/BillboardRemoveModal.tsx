import { useStoreData } from "@/fsd/entity/Store";
import { FC, HTMLAttributes, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useBillboardTableData } from "../../BillboardTableList/model/store/billboard.store";
import { useBillboardRemove } from "../model/removedBillboard.store";
import { BillboardRemove } from "./BillboardRemove";
import { useRouter } from "next/navigation";

interface BillboardRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const BillboardRemoveModal: FC<BillboardRemoveModalProps> = (props) => {
  const { onClose } = props;
  const router = useRouter();

  const { billboardId, resetId } = useBillboardRemove(
    useShallow((state) => ({
      billboardId: state.billboardId,
      resetId: state.resetId,
    })),
  );

  const { getBillboard } = useBillboardTableData(
    useShallow((state) => ({
      getBillboard: state.fetchBillboardListByStoreSlug,
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
};
