"use client";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { cn } from "@/fsd/shared/lib/utils";
import { buttonVariants } from "@/fsd/shared/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface BillboardAddProps extends HTMLAttributes<HTMLDivElement> {}

export const BillboardAdd: FC<BillboardAddProps> = (props) => {
  return (
    <Link
      href={RoutePathEnum.BILLBOARD_ADD}
      className={cn("flex gap-2", buttonVariants())}
    >
      <Plus className="h-4 w-4" />
    </Link>
  );
};
