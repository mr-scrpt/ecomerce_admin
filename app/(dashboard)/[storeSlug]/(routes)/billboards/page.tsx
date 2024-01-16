import { BillboardAdd } from "@/fsd/entity/Billboard";
import { UploaderFileForm } from "@/fsd/entity/FileUploader";
import { FILE_IMG_UPLOAD } from "@/fsd/entity/FileUploader/type/fileUploadExtension.const";
import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";
import { Heading } from "@/fsd/shared/ui/Heading";
import { NoticeApi } from "@/fsd/shared/ui/NoticeApi";
import { BillboardTableWidget } from "@/fsd/widget/BillboardTableWidget";
import { FC, HTMLAttributes } from "react";

interface BillboardPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const BillboardPage: FC<BillboardPageProps> = async (props) => {
  const { params } = props;
  const { storeSlug } = params;

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.BILLBOARD}
          description={PageDescriptionEnum.BILLBOARD}
        />
        <BillboardAdd />
      </div>
      <BillboardTableWidget slug={storeSlug} />
      <UploaderFileForm
        entity={PathUploadEnum.BILLBOARD}
        name="new file test"
        isMultiple={true}
        extension={FILE_IMG_UPLOAD}
      />
      {/* {billboardList.data && ( */}
      {/*   <BillboardTableList billboardList={billboardList.data} /> */}
      {/* )} */}
      <NoticeApi
        title="Billboards Endpoint"
        description="Api endpoints list"
        store={storeSlug}
        entity="billboards"
        entityId="billboardId"
      />
    </main>
  );
};
export default BillboardPage;
