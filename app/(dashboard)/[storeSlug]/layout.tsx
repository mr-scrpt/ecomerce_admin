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
    const store = await prismaDB.store.findFirst({
      where: {
        slug: storeSlug,
        userId,
      },
    });

    if (!store) {
      redirect("/");
    }
    return (
      <>
        <Navbar storeSlug={store.slug} />
        {children}
      </>
    );
  } catch (e) {
    console.log("[DASHBOARD_LAYOUT]", e);
  }
};

export default DashboardLayout;
