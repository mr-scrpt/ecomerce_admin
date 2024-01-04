import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { ColorCreateWidget } from "@/fsd/widget/ColorCreateWidget";
import { FC, HTMLAttributes } from "react";

interface ColorNewPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const ColorNewPage: FC<ColorNewPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.COLOR_ADD}
          description={PageDescriptionEnum.COLOR_ADD}
        />
      </div>
      <ColorCreateWidget slug={storeSlug} />
    </main>
  );
};

export default ColorNewPage;
