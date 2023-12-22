"use client";
import { IBillboard } from "@/fsd/entity/Billboard/type/entity.type";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import { FC, HTMLAttributes, memo } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { useBillboardRemove } from "../../BillboardRemove";
import { useBillboardRemoveModal } from "../../ModalManager/model/store/modal.store";
import { billboardCollumns } from "../data/columns";
import { buildBillboardRow } from "../lib/buildBillboardRow";
import { BillboardColumn } from "../type/table.type";
import { BillboardTableListAction } from "./BillboardTableListAction";
import { useBillboardUpdate } from "../../BillboardUpdate";
import { useRouter } from "next/navigation";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";

interface BillboardTableListProps extends HTMLAttributes<HTMLDivElement> {
  billboardList: IBillboard[];
}

export const BillboardTableList: FC<BillboardTableListProps> = memo((props) => {
  const { billboardList } = props;
  const list = billboardList.map((item) => buildBillboardRow(item));
  const router = useRouter();

  const { onOpen } = useBillboardRemoveModal(
    useShallow((state) => ({
      onOpen: state.onOpen,
    })),
  );

  const { setIdToUpdate } = useBillboardUpdate(
    useShallow((state) => ({
      setIdToUpdate: state.setId,
    })),
  );

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

  const onUpdate = (billboardId: string) => {
    // console.log(" =>>> update", billboardId);
    setIdToUpdate(billboardId);
    router.push(`${RoutePathEnum.BILLBOARDS_EDIT}`);
  };

  const billboardCollumnsWithAction: ColumnDef<BillboardColumn>[] = [
    ...billboardCollumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <BillboardTableListAction
          data={row.original}
          onCopy={onCopy.bind(null, row.original.id)}
          onUpdate={onUpdate.bind(null, row.original.id)}
          onDeletePopup={onDeletePopup.bind(null, row.original.id)}
        />
      ),
    },
  ];
  return (
    <TableData
      columns={billboardCollumnsWithAction}
      data={list}
      filterKey="name"
    />
  );
});
