"use client";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useBillboardTableData } from "@/fsd/feature/BillboardTableList/model/store/billboard.store";
import { useShallow } from "zustand/react/shallow";
import { useStoreData } from "@/fsd/entity/Store";
import { BillboardCreate } from "@/fsd/feature/BillboardCreate";
import {
  BillboardUpdate,
  useBillboardUpdate,
} from "@/fsd/feature/BillboardUpdate";
import { billboardAction } from "@/fsd/entity/Billboard";

interface BillboardUpdateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const BillboardUpdateWidget: FC<BillboardUpdateWidgetProps> = (
  props,
) => {
  const { storeSlug } = props;

  const router = useRouter();
  const path = `/${storeSlug}${RoutePathEnum.BILLBOARDS}`;

  const { getBillboardList: getBillboard } = useBillboardTableData(
    useShallow((state) => ({
      getBillboardList: state.fetchBillboardListByStoreSlug,
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
    getBillboard(storeSlug);
    resetBillboard();
    router.replace(path);
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
