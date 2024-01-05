"use client";
import { BillboardColumn, useBillboardList } from "@/fsd/entity/Billboard";
import { useBillboardRemove } from "@/fsd/feature/BillboardRemove";
import { useBillboardRemoveModal } from "@/fsd/feature/ModalManager";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { billboardColumns } from "../data/columns";
import { buildBillboardRow } from "../lib/buildBillboardRow";
import { BillboardTableAction } from "./BillboardTableAction";

interface BillboardTableWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const BillboardTableWidget: FC<BillboardTableWidgetProps> = memo(
  (props) => {
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

    const { onOpen } = useBillboardRemoveModal(
      useShallow((state) => ({
        onOpen: state.onOpen,
      })),
    );

    const { setIdToRemove } = useBillboardRemove(
      useShallow((state) => ({
        setIdToRemove: state.setId,
      })),
    );

    const onCopy = useCallback((id: string) => {
      navigator.clipboard.writeText(id);
      toast.success("Billboard ID copied to clipboard.");
    }, []);

    const onDeletePopup = useCallback(
      (billboardId: string) => {
        setIdToRemove(billboardId);

        onOpen();
      },
      [setIdToRemove, onOpen],
    );

    const updateHref = useCallback((billboardSlug: string) => {
      return `${RoutePathEnum.BILLBOARD_EDIT}/${billboardSlug}`;
    }, []);

    const billboardCollumnsWithAction: ColumnDef<BillboardColumn>[] = [
      ...billboardColumns,
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <BillboardTableAction
            data={row.original}
            onCopy={onCopy.bind(null, row.original.id)}
            hrefUpdate={updateHref(row.original.slug)}
            onDeletePopup={onDeletePopup.bind(null, row.original.id)}
          />
        ),
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
  },
);
