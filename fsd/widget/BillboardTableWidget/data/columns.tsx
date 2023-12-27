"use client";

import { BillboardColumn } from "@/fsd/entity/Billboard";
import { ColumnDef } from "@tanstack/react-table";
// import { BillboardTableListAction } from "../ui/BillboardTableListAction";

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
