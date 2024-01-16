"use client";

import { routeData } from "@/fsd/shared/data/rotue.data";
import { cn } from "@/fsd/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, HTMLAttributes, useMemo } from "react";

interface MenuMainProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const MenuMain: FC<MenuMainProps> = (props) => {
  const { slug, className } = props;
  const pathname = usePathname();

  const routes = useMemo(() => routeData(slug), [slug]);

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.href === pathname
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};