"use client";
import { useStoreData } from "@/fsd/entity/Store";
import { ColorUpdate, useColorUpdate } from "@/fsd/feature/ColorUpdate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface ColorUpdateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const ColorUpdateWidget: FC<ColorUpdateWidgetProps> = (props) => {
  const { storeSlug } = props;

  const router = useRouter();
  const path = `/${storeSlug}${RoutePathEnum.CATEGORIES}`;

  // const { getColorList: getColor } = useColorList(
  //   useShallow((state) => ({
  //     getColorList: state.fetchColorList,
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

  const { getColorCurrent, resetColor, color, loading } = useColorUpdate(
    useShallow((state) => ({
      color: state.color,
      getColorCurrent: state.getColorCurrent,
      loading: state.loading,
      resetColor: state.resetColor,
    })),
  );

  const onSucces = useCallback(() => {
    // revalidation color list
    // getColor(storeSlug);
    resetColor();
    router.push(path);
    router.refresh();
  }, [resetColor, path, router]);

  useEffect(() => {
    getColorCurrent();
  }, [getColorCurrent]);

  return (
    <>
      {color && (
        <ColorUpdate onSuccess={onSucces} storeId={storeId} color={color} />
      )}
    </>
  );
};
