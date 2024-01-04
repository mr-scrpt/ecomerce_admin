import { ColorAdd } from "@/fsd/entity/Color";
import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { NoticeApi } from "@/fsd/shared/ui/NoticeApi";
import { ColorTableWidget } from "@/fsd/widget/ColorTableWidget";
import { FC, HTMLAttributes } from "react";

interface ColorPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const ColorPage: FC<ColorPageProps> = async (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const colorList =
  //   await colorAction.getColorListByStoreSlug(storeSlug);

  // const colorCount = colorList.data?.length || 0;
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.COLOR}
          description={PageDescriptionEnum.COLOR}
        />
        <ColorAdd />
      </div>
      <ColorTableWidget slug={storeSlug} />
      <NoticeApi
        title="Colors Endpoint"
        description="Api endpoints list"
        store={storeSlug}
        entity="colors"
        entityId="colorId"
      />
    </main>
  );
};
export default ColorPage;
