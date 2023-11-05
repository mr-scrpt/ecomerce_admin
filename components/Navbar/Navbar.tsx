// "use client";
import { UserButton, auth } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import { FC, HTMLAttributes } from "react";
import { MenuMain } from "../MenuMain/MenuMain";
import { StoreSwitcher } from "../StoreSwitcher/StoreSwitcher";
import { ThemeSwitcher } from "../ui/theme-switcher";
import { StoreSwitcherContainer } from "@/src/feature/storeSwitcher/ui/StoreSwitcherContainer";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  // storeSlug: string;
  // storeList: Store[];
}

export const Navbar: FC<NavbarProps> = async (props) => {
  // const { storeSlug, storeList } = props;
  // const { storeSlug } = props;
  // const { userId } = auth();
  // if (!userId) return null;

  return (
    <div className="border-b px-4">
      <div className="flex h-16 items-center gap-x-4">
        {/* <StoreSwitcher items={storeList} /> */}
        {/* <StoreSwitcher /> */}
        {/* <MenuMain slug={storeSlug} /> */}
        <StoreSwitcherContainer />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
