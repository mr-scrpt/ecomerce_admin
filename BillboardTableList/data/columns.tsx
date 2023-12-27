"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { BillboardTableListAction } from "../ui/BillboardTableListAction";
import { BillboardColumn } from "../type/table.type";

export const billboardCollumns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  // {
  //   accessorKey: "action",
  //   header: "Actions",
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <BillboardTableListAction data={row.original} />,
  // },
];
