import { OpenModalStoreRemove } from "@/fsd/feature/ModalManager";
import { StoreSettings } from "@/fsd/feature/StoreSettings/ui/StoreSettings";
import { Heading } from "@/fsd/shared/ui/Heading";
import { Notice } from "@/fsd/shared/ui/Notice/Notice";
import { FC, HTMLAttributes } from "react";

interface SettingsPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const SettingsPage: FC<SettingsPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  const origin = process.env["HOST"];
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading title="Settings" description="Manage store preference" />
        <OpenModalStoreRemove />
      </div>

      <StoreSettings />
      <Notice
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${storeSlug}`}
      />
    </main>
  );
};

export default SettingsPage;
