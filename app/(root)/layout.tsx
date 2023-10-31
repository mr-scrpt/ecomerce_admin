import prismaDB from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC, HTMLAttributes } from "react";

interface RootLayoutProps extends HTMLAttributes<HTMLElement> {}

const RootLayout: FC<RootLayoutProps> = async (props) => {
  const { children } = props;

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismaDB.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
};

export default RootLayout;
