import { CategoryAdd, categoryAction } from "@/fsd/entity/Category";
import { RouteNameEnum } from "@/fsd/shared/data/route.enum";
import { Heading } from "@/fsd/shared/ui/Heading";
import { NoticeApi } from "@/fsd/shared/ui/NoticeApi";
import { CategoryTableWidget } from "@/fsd/widget/CategoryTableWidget";
import { FC, HTMLAttributes } from "react";

interface CategoriesPageProps extends HTMLAttributes<HTMLDivElement> {
  params: { storeSlug: string };
}

const CategoriesPage: FC<CategoriesPageProps> = async (props) => {
  const { params } = props;
  const { storeSlug } = params;
  const categoriesList =
    await categoryAction.getCategoryListByStoreSlug(storeSlug);

  const categoriesCount = categoriesList.data?.length || 0;
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading
          title={`${RouteNameEnum.CATEGORIES} (${categoriesCount})`}
          description="Manage categories for your store"
        />
        <CategoryAdd />
      </div>
      <CategoryTableWidget slug={storeSlug} />
      <NoticeApi
        title="Categories Endpoint"
        description="Api endpoints list"
        store={storeSlug}
        entity="categories"
        entityId="categoriesId"
      />
    </main>
  );
};
export default CategoriesPage;
