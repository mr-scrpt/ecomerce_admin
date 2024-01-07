"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OptionColumn } from "../type/table.type";

export const optionColumns: ColumnDef<OptionColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "value",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        {row.original.value &&
          row.original.value
            .slice(0, 3)
            .map((item) => <div key={item.name}>{item.value}</div>)}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
