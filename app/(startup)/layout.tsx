import { storeAction } from "@/fsd/entity/Store";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC, HTMLAttributes } from "react";

interface StartupProps extends HTMLAttributes<HTMLElement> {}

const StartupLayout: FC<StartupProps> = async (props) => {
  const { children } = props;

  const { userId } = auth();

  if (!userId) redirect(RoutePathEnum.SIGN_IN);

  const { data, error } = await storeAction.getStoreStoreFirst();
  if (data && !error) {
    redirect(`/${data.slug}`);
  }

  return <>{children}</>;
};

export default StartupLayout;
