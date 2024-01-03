import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { BillboardCreateWidget } from "@/fsd/widget/BillboardCreateWidget";
import { FC, HTMLAttributes } from "react";

interface SizeNewPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const SizeNewPage: FC<SizeNewPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.SIZE_ADD}
          description={PageDescriptionEnum.SIZE_ADD}
        />
        {/* <BillboardAdd /> */}
      </div>
      {/* <BillboardCreateWidget slug={storeSlug} />; */}
    </main>
  );
};

export default SizeNewPage;
