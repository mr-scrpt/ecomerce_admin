import { BillboardCreate } from "@/fsd/feature/BillboardCreate";
import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { Heading } from "@/fsd/shared/ui/Heading";
import { BillboardUpdateWidget } from "@/fsd/widget/BillboardUpdateWidget";
import { FC, HTMLAttributes } from "react";

interface BillboardUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const BillboardUpdatePage: FC<BillboardUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.BILLBOARD_UPDATE}
          description={PageDescriptionEnum.BILLBOARD_UPDATE}
        />
        {/* <BillboardAdd /> */}
      </div>
      <BillboardUpdateWidget storeSlug={storeSlug} />;
    </main>
  );
};

export default BillboardUpdatePage;
