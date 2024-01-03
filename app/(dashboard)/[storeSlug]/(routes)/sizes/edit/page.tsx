import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { FC, HTMLAttributes } from "react";

interface SizeUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const SizeUpdatePage: FC<SizeUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
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
      {/* <BillboardUpdateWidget storeSlug={storeSlug} /> */}
    </main>
  );
};

export default SizeUpdatePage;
