import { BillboardCreate } from "@/fsd/feature/CreateBillboard";
import { headers } from "next/dist/client/components/headers";
import { FC, HTMLAttributes } from "react";

interface BillboardNewPageProps extends HTMLAttributes<HTMLDivElement> {}

const BillboardNewPage: FC<BillboardNewPageProps> = (props) => {
  const _headers = headers();
  const currentUrl = _headers.get("x-url");

  return <BillboardCreate onSuccesUrlRedirect={currentUrl} />;
};

export default BillboardNewPage;
