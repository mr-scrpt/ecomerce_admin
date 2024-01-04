"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ColorColumn } from "../type/table.type";

export const colorCollumns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "value",
    cell: ({ row }) => row.original.value,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
