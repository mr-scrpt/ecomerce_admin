"use client";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStoreData } from "@/fsd/entity/Store";
import { CategoryCreate } from "@/fsd/feature/CategoryCreate";

interface CategoryCreateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const CategoryCreateWidget: FC<CategoryCreateWidgetProps> = (props) => {
  const { slug } = props;

  const router = useRouter();
  const path = `/${slug}${RoutePathEnum.CATEGORIES}`;

  const { getCategoryList: getCategory } = useCategoryTableData(
    useShallow((state) => ({
      getCategoryList: state.fetchCategoryListByStoreSlug,
    })),
  );

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const onSucces = useCallback(() => {
    // revalidation category list
    // getCategory(slug);
    router.replace(path);
    router.refresh();
  }, []);

  return <CategoryCreate onSuccess={onSucces} storeId={storeId} />;
};
