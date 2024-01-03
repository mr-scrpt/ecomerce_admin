import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { BillboardCreateWidget } from "@/fsd/widget/BillboardCreateWidget";
import { FC, HTMLAttributes } from "react";

interface BillboardNewPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const BillboardNewPage: FC<BillboardNewPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.BILLBOARD_ADD}
          description={PageDescriptionEnum.BILLBOARD_ADD}
        />
        {/* <BillboardAdd /> */}
      </div>
      <BillboardCreateWidget slug={storeSlug} />
    </main>
  );
};

export default BillboardNewPage;
