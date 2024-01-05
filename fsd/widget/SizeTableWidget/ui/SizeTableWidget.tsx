"use client";
import { useSizeList, useSizeRemove } from "@/fsd/entity/Size";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { sizeColumns } from "../data/columns";
import { buildSizeRow } from "../lib/buildSizeRow";
import { SizeColumn } from "../type/table.type";
import { SizeTableAction } from "./SizeTableAction";
import { useSizeRemoveModal } from "@/fsd/feature/ModalManager";
import { useSizeUpdate } from "@/fsd/feature/SizeUpdate";
import { Spinner } from "@/fsd/shared/ui/Spinner/Spinner";

interface SizeTableWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const SizeTableWidget: FC<SizeTableWidgetProps> = (props) => {
  const { slug } = props;

  const { sizeList, fetchSizeList, isLoading } = useSizeList(
    useShallow((state) => ({
      isLoading: state.loading,
      sizeList: state.sizeList,
      fetchSizeList: state.fetchSizeList,
    })),
  );

  useEffect(() => {
    fetchSizeList(slug);
  }, [slug, fetchSizeList]);

  const { onOpen } = useSizeRemoveModal(
    useShallow((state) => ({
      onOpen: state.onOpen,
    })),
  );

  const { setIdToRemove } = useSizeRemove(
    useShallow((state) => ({
      setIdToRemove: state.setId,
    })),
  );

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Size value copied to clipboard.");
  };

  const onDeletePopup = (sizeId: string) => {
    setIdToRemove(sizeId);

    onOpen();
  };

  const updateHref = useCallback((sizeSlug: string) => {
    return `${RoutePathEnum.SIZE_EDIT}/${sizeSlug}`;
  }, []);

  const sizeCollumnsWithAction: ColumnDef<SizeColumn>[] = [
    ...sizeColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <SizeTableAction
          data={row.original}
          onCopy={onCopy.bind(null, row.original.value)}
          hrefUpdate={updateHref(row.original.slug)}
          onDeletePopup={onDeletePopup.bind(null, row.original.id)}
        />
      ),
    },
  ];

  const listFormated = useMemo(
    () => sizeList.map((item) => buildSizeRow(item)),
    [sizeList],
  );
  return (
    <TableData
      columns={sizeCollumnsWithAction}
      data={listFormated}
      filterKey="name"
      isLoading={isLoading}
    />
  );
};
