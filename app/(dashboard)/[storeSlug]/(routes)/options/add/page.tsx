import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { OptionCreateWidget } from "@/fsd/widget/OptionCreateWidget";
import { FC, HTMLAttributes } from "react";

interface OptionNewPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const OptionNewPage: FC<OptionNewPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.OPTION_ADD}
          description={PageDescriptionEnum.OPTION_ADD}
        />
      </div>
      <OptionCreateWidget slug={storeSlug} />
    </main>
  );
};

export default OptionNewPage;
