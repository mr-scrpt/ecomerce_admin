import { RouteNameEnum } from "@/fsd/shared/data/route.enum";
import { Heading } from "@/fsd/shared/ui/Heading";
import { HTMLAttributes } from "react";
interface DashboardPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const DashboardPage = (props: DashboardPageProps) => {
  const { params } = props;

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading title={RouteNameEnum.HOME} description="Store overview" />
      </div>
    </main>
  );
};

export default DashboardPage;
