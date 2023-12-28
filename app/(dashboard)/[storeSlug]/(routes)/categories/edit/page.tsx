import { BillboardUpdateWidget } from "@/fsd/widget/BillboardUpdateWidget";
import { CategoryUpdateWidget } from "@/fsd/widget/CategoryUpdateWidget";
import { FC, HTMLAttributes } from "react";

interface CategoryUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const CategoryUpdatePage: FC<CategoryUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");

  return <CategoryUpdateWidget storeSlug={storeSlug} />;
};

export default CategoryUpdatePage;
