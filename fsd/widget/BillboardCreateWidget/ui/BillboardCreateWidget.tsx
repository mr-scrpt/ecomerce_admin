"use client";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStoreData } from "@/fsd/entity/Store";
import { BillboardCreate } from "@/fsd/feature/BillboardCreate";
import { useBillboardList } from "@/fsd/entity/Billboard";
// import { useBillboardTableData } from "@/fsd/entity/Billboard";

interface BillboardCreateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const BillboardCreateWidget: FC<BillboardCreateWidgetProps> = memo(
  (props) => {
    const { slug } = props;

    const router = useRouter();
    const path = `/${slug}${RoutePathEnum.BILLBOARDS}`;

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
  },
);
