import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { BillboardUpdateWidget } from "@/fsd/widget/BillboardUpdateWidget";
import { CategoryUpdateWidget } from "@/fsd/widget/CategoryUpdateWidget";
import { Heading } from "lucide-react";
import { FC, HTMLAttributes } from "react";

interface CategoryUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const CategoryUpdatePage: FC<CategoryUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug } = params;
  // const _headers = headers();
  // const currentUrl = _headers.get("x-url");

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.CATEGORY_UPDATE}
          description={PageDescriptionEnum.CATEGORY_UPDATE}
        />
      </div>
      <CategoryUpdateWidget storeSlug={storeSlug} />;
    </main>
  );
};

export default CategoryUpdatePage;
