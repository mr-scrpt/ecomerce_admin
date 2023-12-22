import { BillboardCreateWidget } from "@/fsd/widget/BillboardCreateWidget";
import { FC, HTMLAttributes } from "react";

interface BillboardNewPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const BillboardNewPage: FC<BillboardNewPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");
  // const router = useRouter();

  return <BillboardCreateWidget slug={storeSlug} />;
};

export default BillboardNewPage;
