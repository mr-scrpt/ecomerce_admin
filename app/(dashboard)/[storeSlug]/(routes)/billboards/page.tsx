import { RouteNameEnum } from "@/fsd/shared/data/route.enum";
import { Heading } from "@/fsd/shared/ui/Heading";
import { FC, HTMLAttributes } from "react";

interface BillboardPageProps extends HTMLAttributes<HTMLDivElement> {}

const BillboardPage: FC<BillboardPageProps> = (props) => {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={RouteNameEnum.BILBOARDS}
          description="Manage billboards for yout store"
        />
      </div>
    </main>
  );
};
export default BillboardPage;
