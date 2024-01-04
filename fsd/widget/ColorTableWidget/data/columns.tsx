"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ColorColumn } from "../type/table.type";
import { cn } from "@/fsd/shared/lib/utils";

export const colorCollumns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "value",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        <span
          className="w-4 h-4 border-2"
          style={{ backgroundColor: `#${row.original.value}` }}
        ></span>
        <span>{row.original.value}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
