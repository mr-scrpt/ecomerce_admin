import { CategoryCreateWidget } from "@/fsd/widget/CategoryCreateWidget";
import { FC, HTMLAttributes } from "react";

interface BillboardNewPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const CategoryNewPage: FC<BillboardNewPageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");
  // const router = useRouter();

  return <CategoryCreateWidget slug={storeSlug} />;
};

export default CategoryNewPage;
