"use client";
import { ThemeSwitcher } from "@/fsd/shared/ui/theme-switcher";
import { useStoreData, useStoreListData } from "@/fsd/entity/Store";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { StoreSwitcher } from "@/fsd/feature/StoreSwitcher/ui/StoreSwitcher";
import { UserButton } from "@clerk/nextjs";
import { FC, HTMLAttributes, memo, useEffect } from "react";
import { MenuMain } from "@/fsd/entity/MenuMain/ui/MenuMain";
import { cn } from "@/fsd/shared/lib/utils";
import { useShallow } from "zustand/react/shallow";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const Navbar: FC<NavbarProps> = memo((props) => {
  const { storeSlug, className } = props;
  const { user } = useUserData(
    useShallow((state) => ({
      user: state.user,
    })),
  );

  const {
    setStoreBySlug: setStoreCurrentBySlug,
    loading,
    error,
    storeCurrent,
  } = useStoreData(
    useShallow((state) => ({
      storeCurrent: state.storeCurrent,
      setStoreBySlug: state.setStoreBySlug,
      loading: state.loading,
      error: state.error,
    })),
  );

  const { setStoreListByUser } = useStoreListData(
    useShallow((state) => ({
      loading: state.loading,
      error: state.error,
      setStoreListByUser: state.setStoreListByUser,
    })),
  );

  useEffect(() => {
    if (storeSlug) {
      setStoreCurrentBySlug(storeSlug);
    }
  }, [storeSlug]);

  useEffect(() => {
    if (user?.id) {
      setStoreListByUser(user.id);
    }
  }, [user]);

  return (
    <div className={cn("border-b", className)}>
      <div className="flex h-16 items-center gap-x-4 container">
        <StoreSwitcher />
        {error && <div>Error</div>}
        {loading && <div>loading...</div>}
        {storeCurrent && <MenuMain slug={storeCurrent?.slug} />}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
});
