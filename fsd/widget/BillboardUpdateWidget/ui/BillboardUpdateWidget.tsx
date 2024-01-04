"use client";
import { useStoreData } from "@/fsd/entity/Store";
import {
  BillboardUpdate,
  useBillboardUpdate,
} from "@/fsd/feature/BillboardUpdate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface BillboardUpdateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
  billboardSlug: string;
}

export const BillboardUpdateWidget: FC<BillboardUpdateWidgetProps> = memo(
  (props) => {
    const { storeSlug, billboardSlug } = props;
    console.log("billboardSlug =>>>", billboardSlug);

    const router = useRouter();
    const path = `/${storeSlug}${RoutePathEnum.BILLBOARDS}`;

    const { storeId } = useStoreData(
      useShallow((state) => ({ storeId: state.storeCurrent?.id })),
    );

    const { getBillboardCurrent, billboard, resetBillboard, loading } =
      useBillboardUpdate(
        useShallow((state) => ({
          billboard: state.billboard,
          resetBillboard: state.resetBillboard,
          getBillboardCurrent: state.getBillboardCurrent,
          loading: state.loading,
        })),
      );

    useEffect(() => {
      getBillboardCurrent({ billboardSlug, storeSlug });
    }, [billboardSlug, storeSlug, getBillboardCurrent]);

    const onSucces = useCallback(() => {
      resetBillboard();
      router.push(path);
      router.refresh();
    }, [path, router, resetBillboard]);

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
  },
);
