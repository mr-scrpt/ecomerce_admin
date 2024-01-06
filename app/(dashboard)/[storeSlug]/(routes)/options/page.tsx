import { OptionAdd } from "@/fsd/entity/Option";
import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { NoticeApi } from "@/fsd/shared/ui/NoticeApi";
import { OptionTableWidget } from "@/fsd/widget/OptionTableWidget";
import { FC, HTMLAttributes } from "react";

interface OptionPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const OptionPage: FC<OptionPageProps> = async (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const optionList =
  //   await optionAction.getOptionListByStoreSlug(storeSlug);

  // const optionCount = optionList.data?.length || 0;
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.OPTION}
          description={PageDescriptionEnum.OPTION}
        />
        <OptionAdd />
      </div>
      <OptionTableWidget slug={storeSlug} />
      <NoticeApi
        title="Options Endpoint"
        description="Api endpoints list"
        store={storeSlug}
        entity="options"
        entityId="optionId"
      />
    </main>
  );
};
export default OptionPage;
