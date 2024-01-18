"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BillboardColumnType } from "../type/table.type";

export const billboardColumns: ColumnDef<BillboardColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
