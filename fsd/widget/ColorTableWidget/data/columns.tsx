"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ColorColumn } from "../type/table.type";

export const colorColumns: ColumnDef<ColorColumn>[] = [
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
          className="w-6 h-6 border-2"
          style={{ backgroundColor: `#${row.original.value}` }}
        />
        <span>{row.original.value}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
