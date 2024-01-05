"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SizeColumn } from "../type/table.type";

export const sizeColumns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "value",
    // cell: ({ row }) => row.original.value,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
