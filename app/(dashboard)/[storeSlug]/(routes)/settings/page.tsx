import { OpenModalStoreRemove } from "@/fsd/feature/ModalManager";
import { RouteNameEnum } from "@/fsd/shared/data/route.enum";
import { Heading } from "@/fsd/shared/ui/Heading";
import { NoticeApi } from "@/fsd/shared/ui/NoticeApi/NoticeApi";
import { StoreSettingsWidget } from "@/fsd/widget/StoreSettingsWidget";
import { FC, HTMLAttributes } from "react";

interface SettingsPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const SettingsPage: FC<SettingsPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={RouteNameEnum.SETTINGS}
          description="Manage store preference"
        />
        <OpenModalStoreRemove />
      </div>

      <StoreSettingsWidget />
      <NoticeApi
        title="Main Endpoint"
        description="main api route"
        store={storeSlug}
        onlyMain
      />
    </main>
  );
};

export default SettingsPage;
