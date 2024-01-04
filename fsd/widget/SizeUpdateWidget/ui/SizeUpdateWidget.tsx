"use client";
import { useStoreData } from "@/fsd/entity/Store";
import { SizeUpdate, useSizeUpdate } from "@/fsd/feature/SizeUpdate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface SizeUpdateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
  sizeSlug: string;
}

export const SizeUpdateWidget: FC<SizeUpdateWidgetProps> = (props) => {
  const { storeSlug, sizeSlug } = props;

  const router = useRouter();
  const path = `/${storeSlug}${RoutePathEnum.SIZES}`;

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
    resetSize();
    router.push(path);
    router.refresh();
  }, [resetSize, path, router]);

  useEffect(() => {
    getSizeCurrent({ sizeSlug, storeSlug });
  }, [getSizeCurrent, sizeSlug, storeSlug]);

  return (
    <>
      {size && (
        <SizeUpdate onSuccess={onSucces} storeId={storeId} size={size} />
      )}
    </>
  );
};
