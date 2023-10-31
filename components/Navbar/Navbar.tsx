"use client";
import { UserButton } from "@clerk/nextjs";
import { FC, HTMLAttributes } from "react";
import { MenuMain } from "../MenuMain/MenuMain";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { storeSlug } = props;
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>Store Switcher</div>
        <MenuMain slug={storeSlug} />
        <div className="ml-auto flex items-cente space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
