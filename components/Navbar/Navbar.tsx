"use client";
import { UserButton } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import { FC, HTMLAttributes } from "react";
import { MenuMain } from "../MenuMain/MenuMain";
import { StoreSwitcher } from "../StoreSwitcher/StoreSwitcher";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
  storeList: Store[];
}

export const Navbar: FC<NavbarProps> = async (props) => {
  const { storeSlug, storeList } = props;

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={storeList} />
        <MenuMain slug={storeSlug} />
        <div className="ml-auto flex items-cente space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
