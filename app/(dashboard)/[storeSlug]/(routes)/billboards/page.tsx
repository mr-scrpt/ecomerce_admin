import { BillboardAdd, billboardAction } from "@/fsd/entity/Billboard";
import { BillboardTableList } from "@/fsd/feature/BillboardTableList";
import { RouteNameEnum } from "@/fsd/shared/data/route.enum";
import { Heading } from "@/fsd/shared/ui/Heading";
import { FC, HTMLAttributes } from "react";

interface BillboardPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const BillboardPage: FC<BillboardPageProps> = async (props) => {
  const { params } = props;
  const { storeSlug } = params;
  const billboardList =
    await billboardAction.getBillboardListByStoreSlug(storeSlug);

  console.log(" =>>> list =", billboardList);
  const billboardCount = billboardList.data?.length || 0;
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={`${RouteNameEnum.BILLBOARDS} (${billboardCount})`}
          description="Manage billboards for yout store"
        />
        <BillboardAdd />
      </div>
      {billboardList.data && (
        <BillboardTableList billboardList={billboardList.data} />
      )}
    </main>
  );
};
export default BillboardPage;
