import prismaDB from "@/fsd/shared/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC, HTMLAttributes } from "react";

interface StartupProps extends HTMLAttributes<HTMLElement> {}

const StartupLayout: FC<StartupProps> = async (props) => {
  console.log(" =>>> start up layout");
  const { children } = props;

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismaDB.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.slug}`);

  return <>{children}</>;
};

export default StartupLayout;
