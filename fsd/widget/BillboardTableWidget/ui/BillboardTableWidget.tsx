"use client";
import { BillboardTableList } from "@/fsd/feature/BillboardTableList";
import { useBillboardTableData } from "@/fsd/feature/BillboardTableList/model/store/billboard.store";
import { FC, HTMLAttributes, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface BillboardTableWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const BillboardTableWidget: FC<BillboardTableWidgetProps> = (props) => {
  const { slug } = props;
  const { billboardList, fetchBillboardList } = useBillboardTableData(
    useShallow((state) => ({
      billboardList: state.list,
      fetchBillboardList: state.fetchBillboardListByStoreSlug,
    })),
  );
  useEffect(() => {
    fetchBillboardList(slug);
  }, []);
  return <BillboardTableList billboardList={billboardList} />;
};
