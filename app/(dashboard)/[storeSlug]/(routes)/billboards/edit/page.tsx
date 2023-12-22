import { BillboardCreate } from "@/fsd/feature/BillboardCreate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { BillboardUpdateWidget } from "@/fsd/widget/BillboardUpdateWidget";
import { FC, HTMLAttributes } from "react";

interface BillboardUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const BillboardUpdatePage: FC<BillboardUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");

  return <BillboardUpdateWidget storeSlug={storeSlug} />;
};

export default BillboardUpdatePage;
