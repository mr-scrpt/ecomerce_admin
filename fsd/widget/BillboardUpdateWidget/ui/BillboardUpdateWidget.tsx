"use client";
import { useBillboardList } from "@/fsd/entity/Billboard";
import { useStoreData } from "@/fsd/entity/Store";
import {
  BillboardUpdate,
  useBillboardUpdate,
} from "@/fsd/feature/BillboardUpdate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface BillboardUpdateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const BillboardUpdateWidget: FC<BillboardUpdateWidgetProps> = (
  props,
) => {
  const { storeSlug } = props;

  const router = useRouter();
  const path = `/${storeSlug}${RoutePathEnum.BILLBOARDS}`;

  const { getBillboardList: getBillboard } = useBillboardList(
    useShallow((state) => ({
      getBillboardList: state.fetchBillboardList,
    })),
  );

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const { getBillboardCurrent, resetBillboard, billboard, loading } =
    useBillboardUpdate(
      useShallow((state) => ({
        billboard: state.billboard,
        getBillboardCurrent: state.getBillboardCurrent,
        loading: state.loading,
        resetBillboard: state.resetBillboard,
      })),
    );

  const onSucces = useCallback(() => {
    // revalidation billboard list
    // getBillboard(storeSlug);
    resetBillboard();
    router.push(path);
    router.refresh();
  }, [getBillboard, resetBillboard, path, router, storeSlug]);

  useEffect(() => {
    getBillboardCurrent();
  }, []);

  return (
    <>
      {billboard && (
        <BillboardUpdate
          onSuccess={onSucces}
          storeId={storeId}
          billboard={billboard}
        />
      )}
    </>
  );
};
