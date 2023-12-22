"use client";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { useBillboardTableData } from "@/fsd/feature/BillboardTableList/model/store/billboard.store";
import { useShallow } from "zustand/react/shallow";
import { useStoreData } from "@/fsd/entity/Store";
import { BillboardCreate } from "@/fsd/feature/BillboardCreate";

interface BillboardCreateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const BillboardCreateWidget: FC<BillboardCreateWidgetProps> = (
  props,
) => {
  const { slug } = props;

  const router = useRouter();
  const path = `/${slug}${RoutePathEnum.BILLBOARDS}`;

  const { getBillboardList: getBillboard } = useBillboardTableData(
    useShallow((state) => ({
      getBillboardList: state.fetchBillboardListByStoreSlug,
    })),
  );

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const onSucces = useCallback(() => {
    // revalidation billboard list
    getBillboard(slug);
    router.replace(path);
  }, []);

  return <BillboardCreate onSuccess={onSucces} storeId={storeId} />;
};
