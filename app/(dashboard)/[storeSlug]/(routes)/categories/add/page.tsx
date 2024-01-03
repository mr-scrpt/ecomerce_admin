import {
  PageDescriptionEnum,
  PageTitleEnum,
} from "@/fsd/shared/data/page.title";
import { Heading } from "@/fsd/shared/ui/Heading";
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

  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={PageTitleEnum.CATEGORY_ADD}
          description={PageDescriptionEnum.CATEGORY_ADD}
        />
      </div>
      <CategoryCreateWidget slug={storeSlug} />;
    </main>
  );
};

export default CategoryNewPage;
