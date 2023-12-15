import { BillboardCreate } from "@/fsd/feature/CreateBillboard";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { headers } from "next/dist/client/components/headers";
import { FC, HTMLAttributes } from "react";

interface BillboardNewPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const BillboardNewPage: FC<BillboardNewPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  console.log(" =>>> store slug", storeSlug);
  const _headers = headers();
  const currentUrl = _headers.get("x-url");
  console.log("bill =>>>", `${storeSlug}${RoutePathEnum.BILLBOARDS}`);

  return (
    <BillboardCreate
      onSuccesUrlRedirect={`/${storeSlug}${RoutePathEnum.BILLBOARDS}`}
    />
  );
};

export default BillboardNewPage;
