"use client";

import { BillboardColumn } from "@/fsd/entity/Billboard";
import { ColumnDef } from "@tanstack/react-table";

export const billboardColumns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
