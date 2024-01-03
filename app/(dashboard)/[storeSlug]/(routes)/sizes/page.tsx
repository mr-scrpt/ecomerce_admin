import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { NoticeApi } from "@/fsd/shared/ui/NoticeApi";
import { FC, HTMLAttributes } from "react";

interface SizePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const SizePage: FC<SizePageProps> = async (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const sizeList =
  //   await sizeAction.getSizeListByStoreSlug(storeSlug);

  // const sizeCount = sizeList.data?.length || 0;
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.SIZES}
          description={PageDescriptionEnum.SIZES}
        />
        {/* <SizeAdd /> */}
      </div>
      {/* <SizeTableWidget slug={storeSlug} /> */}
      {/* {sizeList.data && ( */}
      {/*   <SizeTableList sizeList={sizeList.data} /> */}
      {/* )} */}
      <NoticeApi
        title="Sizes Endpoint"
        description="Api endpoints list"
        store={storeSlug}
        entity="sizes"
        entityId="sizeId"
      />
    </main>
  );
};
export default SizePage;
