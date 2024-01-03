import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { HTMLAttributes } from "react";
interface DashboardPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const DashboardPage = (props: DashboardPageProps) => {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.MAIN}
          description={PageDescriptionEnum.MAIN}
        />
      </div>
    </main>
  );
};

export default DashboardPage;
