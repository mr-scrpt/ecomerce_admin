"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { CellAction } from "./cell-action"

export type BillboardColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const billboardCollumns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "action",
    header: "Actions",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />
  // },
];
