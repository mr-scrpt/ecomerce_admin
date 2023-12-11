import { Notice } from "@/fsd/shared/ui/Notice/Notice";
import { HTMLAttributes } from "react";
interface DashboardPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const DashboardPage = (props: DashboardPageProps) => {
  const { params } = props;
  const { storeSlug } = params;
  const origin = process.env["HOST"];

  return (
    <div className="p-4 items-center justify-start">
      <Notice
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${storeSlug}`}
      />
    </div>
  );
};

export default DashboardPage;
