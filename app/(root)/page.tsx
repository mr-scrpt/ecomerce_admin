"use client";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useStoreModal } from "@/hook/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

const MainPage = () => {
  const { onOpen, isOpen } = useStoreModal();
  // const isOpen = useStoreModal((s) => s.isOpen);
  // const onOpen = useStoreModal((s) => s.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return (
    <div className="p-4">
      <ThemeSwitcher />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default MainPage;
