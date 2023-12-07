"use client";
import { ThemeSwitcher } from "@/fsd/shared/ui/theme-switcher";
import { useStoreData } from "@/fsd/entity/Store/model/store/store.store";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { StoreSwitcher } from "@/fsd/feature/StoreSwitcher/ui/StoreSwitcher";
import { UserButton } from "@clerk/nextjs";
import { FC, HTMLAttributes, useEffect } from "react";
import { MenuMain } from "@/fsd/entity/MenuMain/ui/MenuMain";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { storeSlug } = props;
  const { fetchUserId: getUserId, userId } = useUserData();
  const { setStoreListByUser, setStoreCurrentBySlug, storeCurrent } =
    useStoreData();

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      setStoreListByUser(userId);
    }
    if (storeSlug) {
      setStoreCurrentBySlug(storeSlug);
    }
  }, [userId, storeSlug]);

  return (
    <div className="border-b px-4">
      <div className="flex h-16 items-center gap-x-4">
        <StoreSwitcher />
        {storeCurrent && <MenuMain slug={storeCurrent?.slug} />}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
