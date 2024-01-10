"use client";
import { useOptionList, useOptionRemove } from "@/fsd/entity/Option";
import { useOptionRemoveModal } from "@/fsd/feature/ModalManager";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import { FC, HTMLAttributes, useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { optionColumns } from "../data/columns";
import { buildOptionRow } from "../lib/buildOptionRow";
import { OptionColumn } from "../type/table.type";
import { OptionTableAction } from "./OptionTableAction";

interface OptionTableWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const OptionTableWidget: FC<OptionTableWidgetProps> = (props) => {
  const { slug } = props;

  const { optionList, fetchOptionList, isLoading } = useOptionList(
    useShallow((state) => ({
      isLoading: state.loading,
      optionList: state.optionList,
      fetchOptionList: state.fetchOptionList,
    })),
  );

  useEffect(() => {
    fetchOptionList(slug);
  }, []);

  const { onOpen } = useOptionRemoveModal(
    useShallow((state) => ({
      onOpen: state.onOpen,
    })),
  );

  const { setIdToRemove } = useOptionRemove(
    useShallow((state) => ({
      setIdToRemove: state.setId,
    })),
  );

  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Option name copied to clipboard.");
  };

  const onDeletePopup = (optionId: string) => {
    setIdToRemove(optionId);

    onOpen();
  };

  const updateHref = useCallback((optionSlug: string) => {
    return `${RoutePathEnum.OPTION_EDIT}/${optionSlug}`;
  }, []);

  const optionCollumnsWithAction: ColumnDef<OptionColumn>[] = [
    ...optionColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <OptionTableAction
          data={row.original}
          onCopy={onCopy.bind(null, row.original.name)}
          hrefUpdate={updateHref(row.original.slug)}
          onDeletePopup={onDeletePopup.bind(null, row.original.id)}
        />
      ),
    },
  ];

  const listFormated = useMemo(
    () => optionList.map((item) => buildOptionRow(item)),
    [optionList],
  );
  return (
    <TableData
      columns={optionCollumnsWithAction}
      data={listFormated}
      filterKey="name"
      isLoading={isLoading}
    />
  );
};
