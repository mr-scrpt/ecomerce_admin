import { getStoreBySlug } from "@/fsd/entity/Store/model/action/store.action";
import { Navbar } from "@/fsd/widget/Navbar/ui/Navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC, HTMLAttributes } from "react";

interface DashboardLayoutProps extends HTMLAttributes<HTMLElement> {
  params: { storeSlug: string };
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  const { storeSlug } = params;
  const { userId } = auth();
  console.log(" =>>> dashboard");

  const store = await getStoreBySlug(storeSlug);
  if (!store.data || !userId) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex">
        <Navbar storeSlug={storeSlug} className="w-full" />
      </div>
      <div className="container flex flex-col gap-3 py-3">{children}</div>
    </div>
  );
};

export default DashboardLayout;
