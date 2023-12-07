"use client";
import { ThemeSwitcher } from "@/fsd/shared/ui/theme-switcher";
import { useStoreData } from "@/fsd/entity/Store/model/store/store.store";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { StoreSwitcher } from "@/fsd/feature/StoreSwitcher/ui/StoreSwitcher";
import { UserButton } from "@clerk/nextjs";
import { FC, HTMLAttributes, useEffect } from "react";
import { MenuMain } from "@/fsd/entity/MenuMain/ui/MenuMain";
import { cn } from "@/fsd/shared/lib/utils";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { storeSlug, className } = props;
  const { fetchUserId: getUserId, userId } = useUserData();
  const {
    setStoreListByUser,
    setStoreCurrentBySlug,
    storeCurrent,
    loading,
    error,
  } = useStoreData();

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
    <div className={cn("border-b", className)}>
      <div className="flex h-16 items-center gap-x-4 container">
        <StoreSwitcher />
        {loading ? (
          <div>loading...</div>
        ) : (
          storeCurrent && <MenuMain slug={storeCurrent?.slug} />
        )}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
