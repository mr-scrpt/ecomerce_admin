import { FC, HTMLAttributes, useCallback } from "react";
import { BillboardRemove } from "./BillboardRemove";
import { useBillboardRemove } from "../model/removedBillboard.store";
import { useShallow } from "zustand/react/shallow";
import { usePathname } from "next/navigation";
import { useBillboardTableData } from "../../BillboardTableList/model/store/billboard.store";
import { useStoreData } from "@/fsd/entity/Store";

interface BillboardRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const BillboardRemoveModal: FC<BillboardRemoveModalProps> = (props) => {
  const { onClose } = props;
  // const path = usePathname();

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
    console.log(" =>>> on onSuccess remove");
    getBillboard(slug!);
  }, [resetId, onClose]);

  return (
    <BillboardRemove
      onSuccess={onSuccess}
      onCancel={onClose}
      billboardId={billboardId}
    />
  );
};
