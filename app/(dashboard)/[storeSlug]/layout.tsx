import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC, HTMLAttributes } from "react";

import prismaDB from "@/lib/prismadb";
import { Navbar } from "@/components/Navbar/Navbar";

interface DashboardLayoutProps extends HTMLAttributes<HTMLElement> {
  params: { storeSlug: string };
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();

  const { storeSlug } = params;

  if (!storeSlug) {
    redirect("/");
  }

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const storeCurrent = await prismaDB.store.findFirst({
      where: {
        slug: storeSlug,
        userId,
      },
    });

    if (!storeCurrent) {
      redirect("/");
    }

    const storeList = await prismaDB.store.findMany({
      where: {
        slug: storeSlug,
      },
    });

    return (
      <>
        <Navbar storeSlug={storeCurrent.slug} storeList={storeList} />
        {children}
      </>
    );
  } catch (e) {
    console.log("[DASHBOARD_LAYOUT]", e);
  }
};

export default DashboardLayout;
