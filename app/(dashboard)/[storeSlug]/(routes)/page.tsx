import { NoticeApi } from "@/fsd/shared/ui/NoticeApi";
import { HTMLAttributes } from "react";
interface DashboardPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const DashboardPage = (props: DashboardPageProps) => {
  const { params } = props;
  const { storeSlug } = params;

  return (
    <div className="p-4 items-center justify-start">
      <NoticeApi
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        apiPath={storeSlug}
      />
    </div>
  );
};

export default DashboardPage;
