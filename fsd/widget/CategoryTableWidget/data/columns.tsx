"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoryColumnType } from "../type/table.type";

export const categoryCollumns: ColumnDef<CategoryColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "billboard",
  //   header: "Billboard",
  //   cell: ({ row }) => row.original.billboardName,
  // },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
