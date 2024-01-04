"use client";
import { useColorList, useColorRemove } from "@/fsd/entity/Color";
import { useColorRemoveModal } from "@/fsd/feature/ModalManager";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { colorCollumns } from "../data/columns";
import { buildColorRow } from "../lib/buildColorRow";
import { ColorColumn } from "../type/table.type";
import { ColorTableAction } from "./ColorTableAction";

interface ColorTableWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const ColorTableWidget: FC<ColorTableWidgetProps> = (props) => {
  const { slug } = props;

  const { colorList, fetchColorList } = useColorList(
    useShallow((state) => ({
      colorList: state.colorList,
      fetchColorList: state.fetchColorList,
    })),
  );

  useEffect(() => {
    fetchColorList(slug);
  }, []);

  const { onOpen } = useColorRemoveModal(
    useShallow((state) => ({
      onOpen: state.onOpen,
    })),
  );

  const { setIdToRemove } = useColorRemove(
    useShallow((state) => ({
      setIdToRemove: state.setId,
    })),
  );

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Color value copied to clipboard.");
  };

  const onDeletePopup = (colorId: string) => {
    setIdToRemove(colorId);

    onOpen();
  };

  const updateHref = useCallback((colorSlug: string) => {
    return `${RoutePathEnum.COLOR_EDIT}/${colorSlug}`;
  }, []);

  const colorCollumnsWithAction: ColumnDef<ColorColumn>[] = [
    ...colorCollumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <ColorTableAction
          data={row.original}
          onCopy={onCopy.bind(null, row.original.value)}
          hrefUpdate={updateHref(row.original.slug)}
          onDeletePopup={onDeletePopup.bind(null, row.original.id)}
        />
      ),
    },
  ];

  const listFormated = useMemo(
    () => colorList.map((item) => buildColorRow(item)),
    [colorList],
  );
  return (
    <TableData
      columns={colorCollumnsWithAction}
      data={listFormated}
      filterKey="name"
    />
  );
};
