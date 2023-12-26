import { BillboardAdd, billboardAction } from "@/fsd/entity/Billboard";
import { BillboardTableList } from "@/fsd/feature/BillboardTableList";
import { RouteNameEnum } from "@/fsd/shared/data/route.enum";
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
  const billboardList =
    await billboardAction.getBillboardListByStoreSlug(storeSlug);

  const billboardCount = billboardList.data?.length || 0;
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={`${RouteNameEnum.BILLBOARDS} (${billboardCount})`}
          description="Manage billboards for your store"
        />
        <BillboardAdd />
      </div>
      <BillboardTableWidget slug={storeSlug} />
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
