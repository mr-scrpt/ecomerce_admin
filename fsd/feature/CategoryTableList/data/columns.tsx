"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoryColumn } from "../type/table.type";

export const billboardCollumns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardName,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
