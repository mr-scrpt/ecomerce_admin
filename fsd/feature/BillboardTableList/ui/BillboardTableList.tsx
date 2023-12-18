"use client";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { FC, HTMLAttributes, memo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { billboardCollumns } from "../data/columns";
import { useBillboardTableData } from "../model/store/billboard.store";

interface BillboardTableListProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const BillboardTableList: FC<BillboardTableListProps> = memo((props) => {
  const { storeSlug } = props;
  const { list, fetchList } = useBillboardTableData(
    useShallow((state) => ({
      list: state.list,
      fetchList: state.fetchBillboardByStoreSlug,
    })),
  );

  useEffect(() => {
    fetchList(storeSlug);
  }, []);

  const listWithAcitons = list.map((item) => ({ ...item, action: "d" }));

  return <TableData columns={billboardCollumns} data={listWithAcitons} />;
});
