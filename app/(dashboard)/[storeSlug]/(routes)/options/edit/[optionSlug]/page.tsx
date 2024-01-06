import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { OptionUpdateWidget } from "@/fsd/widget/OptionUpdateWidget";
import { FC, HTMLAttributes } from "react";

interface OptionUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string; optionSlug: string };
}

const OptionUpdatePage: FC<OptionUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug, optionSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.OPTION_UPDATE}
          description={PageDescriptionEnum.OPTION_UPDATE}
        />
        {/* <BillboardAdd /> */}
      </div>
      <OptionUpdateWidget storeSlug={storeSlug} optionSlug={optionSlug} />
    </main>
  );
};

export default OptionUpdatePage;
