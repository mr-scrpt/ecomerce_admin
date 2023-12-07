"use client";
import { useStoreData } from "@/fsd/entity/Store/model/store/store.store";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { UserButton } from "@clerk/nextjs";
import { FC, HTMLAttributes, useEffect } from "react";
import { MenuMain } from "../MenuMain/MenuMain";
import { StoreSwitcher } from "../StoreSwitcher/StoreSwitcher";
import { ThemeSwitcher } from "../ui/theme-switcher";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { storeSlug } = props;
  const { fetchUserId: getUserId, userId } = useUserData();
  const { fetchStoreListByUser: getStoreListByUser, storeList } =
    useStoreData();

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getStoreListByUser(userId);
    }
  }, [userId]);

  return (
    <div className="border-b px-4">
      <div className="flex h-16 items-center gap-x-4">
        <StoreSwitcher items={storeList} />
        <MenuMain slug={storeSlug} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
