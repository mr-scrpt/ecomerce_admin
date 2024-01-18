"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OptionColumnType } from "../type/table.type";

export const optionColumns: ColumnDef<OptionColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "value",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        {row.original.value &&
          row.original.value
            .slice(0, 3)
            .map((item) => <div key={item.name}>{item.value}</div>)}
        {row.original.value.length > 3 && <div>...</div>}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
