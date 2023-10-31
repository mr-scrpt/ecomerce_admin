import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { FC, HTMLAttributes } from "react";
import prismaDB from "@/lib/prismadb";

interface DashboardLayoutProps extends HTMLAttributes<HTMLElement> {
  params: { storeId: string };
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div>Navbar</div>
      {children}
    </>
  );
};

export default DashboardLayout;
