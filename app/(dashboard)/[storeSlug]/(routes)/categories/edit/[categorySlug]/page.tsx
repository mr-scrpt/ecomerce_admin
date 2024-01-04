import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
import { CategoryUpdateWidget } from "@/fsd/widget/CategoryUpdateWidget";
import { FC, HTMLAttributes } from "react";

interface CategoryUpdatePageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string; categorySlug: string };
}

const CategoryUpdatePage: FC<CategoryUpdatePageProps> = (props) => {
  const { params } = props;
  const { storeSlug, categorySlug } = params;

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.CATEGORY_UPDATE}
          description={PageDescriptionEnum.CATEGORY_UPDATE}
        />
      </div>
      <CategoryUpdateWidget storeSlug={storeSlug} categorySlug={categorySlug} />
    </main>
  );
};

export default CategoryUpdatePage;
