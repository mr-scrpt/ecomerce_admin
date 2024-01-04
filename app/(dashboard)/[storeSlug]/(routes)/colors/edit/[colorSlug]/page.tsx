import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { ColorUpdateWidget } from "@/fsd/widget/ColorUpdateWidget";
import { FC, HTMLAttributes } from "react";

interface ColorUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string; colorSlug: string };
}

const ColorUpdatePage: FC<ColorUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug, colorSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.COLOR_UPDATE}
          description={PageDescriptionEnum.COLOR_UPDATE}
        />
        {/* <BillboardAdd /> */}
      </div>
      <ColorUpdateWidget storeSlug={storeSlug} colorSlug={colorSlug} />
    </main>
  );
};

export default ColorUpdatePage;
