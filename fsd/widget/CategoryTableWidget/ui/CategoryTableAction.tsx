"use client";
import { Button } from "@/fsd/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/fsd/shared/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { CategoryColumn } from "../type/table.type";
import Link from "next/link";

interface CategoryTableActionProps extends HTMLAttributes<HTMLDivElement> {
  data: CategoryColumn;
  onCopy: () => void;
  hrefUpdate: string;
  onDeletePopup: () => void;
}

export const CategoryTableAction: FC<CategoryTableActionProps> = (props) => {
  const { onCopy, onDeletePopup, hrefUpdate } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            onCopy();
          }}
        >
          <Copy className="mr-2 h-4 w-4" /> Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={hrefUpdate}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDeletePopup}>
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
