import { OpenModalStoreRemove } from "@/fsd/feature/ModalManager";
import { StoreSettings } from "@/fsd/feature/StoreSettings/ui/StoreSettings";
import { Heading } from "@/fsd/shared/ui/Heading";
import { FC, HTMLAttributes } from "react";

interface SettingsPageProps extends HTMLAttributes<HTMLDivElement> {}

const SettingsPage: FC<SettingsPageProps> = () => {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading title="Settings" description="Manage store preference" />
        <OpenModalStoreRemove />
      </div>

      <StoreSettings />
    </main>
  );
};

export default SettingsPage;
