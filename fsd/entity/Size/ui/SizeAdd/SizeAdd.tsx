"use client";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { cn } from "@/fsd/shared/lib/utils";
import { buttonVariants } from "@/fsd/shared/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface SizeAddProps extends HTMLAttributes<HTMLDivElement> {}

export const SizeAdd: FC<SizeAddProps> = (props) => {
  return (
    <Link
      href={RoutePathEnum.SIZE_ADD}
      className={cn("flex gap-2", buttonVariants())}
    >
      <Plus className="h-4 w-4" />
    </Link>
  );
};
