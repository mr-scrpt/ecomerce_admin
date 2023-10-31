import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { FC, HTMLAttributes } from "react";
import prismaDB from "@/lib/prismadb";
import { throws } from "assert";

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
      <div>Navbar</div>
      {children}
    </>
  );
};

export default DashboardLayout;
