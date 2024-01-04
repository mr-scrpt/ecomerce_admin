import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { SizeUpdateWidget } from "@/fsd/widget/SizeUpdateWidget";
import { FC, HTMLAttributes } from "react";

interface SizeUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string; sizeSlug: string };
}

const SizeUpdatePage: FC<SizeUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug, sizeSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.SIZE_UPDATE}
          description={PageDescriptionEnum.SIZE_UPDATE}
        />
        {/* <BillboardAdd /> */}
      </div>
      <SizeUpdateWidget storeSlug={storeSlug} sizeSlug={sizeSlug} />
    </main>
  );
};

export default SizeUpdatePage;
