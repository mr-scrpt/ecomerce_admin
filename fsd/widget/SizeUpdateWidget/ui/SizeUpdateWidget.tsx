"use client";
import { useStoreData } from "@/fsd/entity/Store";
import { SizeUpdate, useSizeUpdate } from "@/fsd/feature/SizeUpdate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface SizeUpdateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const SizeUpdateWidget: FC<SizeUpdateWidgetProps> = (props) => {
  const { storeSlug } = props;

  const router = useRouter();
  const path = `/${storeSlug}${RoutePathEnum.CATEGORIES}`;

  // const { getSizeList: getSize } = useSizeList(
  //   useShallow((state) => ({
  //     getSizeList: state.fetchSizeList,
  //   })),
  // );

  // const { billboardList, fetchBillboardList } = useBillboardList(
  //   useShallow((state) => ({
  //     billboardList: state.billboardList,
  //     fetchBillboardList: state.fetchBillboardList,
  //   })),
  // );

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const { getSizeCurrent, resetSize, size, loading } = useSizeUpdate(
    useShallow((state) => ({
      size: state.size,
      getSizeCurrent: state.getSizeCurrent,
      loading: state.loading,
      resetSize: state.resetSize,
    })),
  );

  const onSucces = useCallback(() => {
    // revalidation size list
    // getSize(storeSlug);
    resetSize();
    router.push(path);
    router.refresh();
  }, [resetSize, path, router, storeSlug]);

  useEffect(() => {
    console.log("getSize =>>>");
    getSizeCurrent();
  }, []);

  return (
    <>
      {size && (
        <SizeUpdate onSuccess={onSucces} storeId={storeId} size={size} />
      )}
    </>
  );
};
