"use client";
import { BillboardColumn, useBillboardList } from "@/fsd/entity/Billboard";
import { useBillboardRemove } from "@/fsd/feature/BillboardRemove";
import { useBillboardUpdate } from "@/fsd/feature/BillboardUpdate";
import { useBillboardRemoveModal } from "@/fsd/feature/ModalManager";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { BillboardTableAction } from "./BillboardTableAction";
import { billboardCollumns } from "../data/columns";
import { buildBillboardRow } from "../lib/buildBillboardRow";

interface BillboardTableWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const BillboardTableWidget: FC<BillboardTableWidgetProps> = (props) => {
  const { slug } = props;

  const { billboardList, fetchBillboardList } = useBillboardList(
    useShallow((state) => ({
      billboardList: state.billboardList,
      fetchBillboardList: state.fetchBillboardList,
    })),
  );
  useEffect(() => {
    fetchBillboardList(slug);
  }, []);

  const router = useRouter();

  const { onOpen } = useBillboardRemoveModal(
    useShallow((state) => ({
      onOpen: state.onOpen,
    })),
  );

  // const { setIdToUpdate } = useBillboardUpdate(
  //   useShallow((state) => ({
  //     : state.setId,
  //   })),
  // );

  const { setIdToRemove } = useBillboardRemove(
    useShallow((state) => ({
      setIdToRemove: state.setId,
    })),
  );

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to clipboard.");
  };

  const onDeletePopup = (billboardId: string) => {
    setIdToRemove(billboardId);

    onOpen();
  };

  const updateHref = (billboardSlug: string) => {
    return `${RoutePathEnum.BILLBOARDS_EDIT}/${billboardSlug}`;
  };

  const billboardCollumnsWithAction: ColumnDef<BillboardColumn>[] = [
    ...billboardCollumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        console.log(" =>>> row", row.original);
        return (
          <BillboardTableAction
            data={row.original}
            onCopy={onCopy.bind(null, row.original.id)}
            // onUpdate={onUpdate.bind(null, row.original.slug)}
            hrefUpdate={updateHref(row.original.slug)}
            onDeletePopup={onDeletePopup.bind(null, row.original.id)}
          />
        );
      },
    },
  ];

  const listFormated = useMemo(
    () => billboardList.map((item) => buildBillboardRow(item)),
    [billboardList],
  );
  return (
    <TableData
      columns={billboardCollumnsWithAction}
      data={listFormated}
      filterKey="name"
    />
  );
  // return <BillboardTableList billboardList={billboardList} />;
};
