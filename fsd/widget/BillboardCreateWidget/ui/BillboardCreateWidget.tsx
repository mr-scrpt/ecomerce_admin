"use client";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStoreData } from "@/fsd/entity/Store";
import { BillboardCreate } from "@/fsd/feature/BillboardCreate";
import { useBillboardList } from "@/fsd/entity/Billboard";
// import { useBillboardTableData } from "@/fsd/entity/Billboard";

interface BillboardCreateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const BillboardCreateWidget: FC<BillboardCreateWidgetProps> = (
  props,
) => {
  const { slug } = props;

  const router = useRouter();
  const path = `/${slug}${RoutePathEnum.BILLBOARDS}`;

  // const { getBillboardList: getBillboard } = useBillboardTableData(
  //   useShallow((state) => ({
  //     getBillboardList: state.fetchBillboardListByStoreSlug,
  //   })),
  // );
  const { getBillboardList: getBillboard } = useBillboardList(
    useShallow((state) => ({
      getBillboardList: state.fetchBillboardList,
    })),
  );

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const onSucces = useCallback(() => {
    // revalidation billboard list
    // getBillboard(slug);
    router.replace(path);
    router.refresh();
  }, []);

  return <BillboardCreate onSuccess={onSucces} storeId={storeId} />;
};
