import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { BillboardUpdateWidget } from "@/fsd/widget/BillboardUpdateWidget";
import { FC, HTMLAttributes } from "react";

interface BillboardUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string; billboardSlug: string };
}

const BillboardUpdatePage: FC<BillboardUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug, billboardSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.BILLBOARD_UPDATE}
          description={PageDescriptionEnum.BILLBOARD_UPDATE}
        />
      </div>
      <BillboardUpdateWidget
        storeSlug={storeSlug}
        billboardSlug={billboardSlug}
      />
    </main>
  );
};

export default BillboardUpdatePage;
