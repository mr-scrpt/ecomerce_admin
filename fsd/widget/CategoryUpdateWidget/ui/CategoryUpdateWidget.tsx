"use client";
import { useBillboardList } from "@/fsd/entity/Billboard";
import { useCategoryList } from "@/fsd/entity/Category";
import { useStoreData } from "@/fsd/entity/Store";
import {
  CategoryUpdate,
  useCategoryUpdate,
} from "@/fsd/feature/CategoryUpdate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface CategoryUpdateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
}

export const CategoryUpdateWidget: FC<CategoryUpdateWidgetProps> = (props) => {
  const { storeSlug } = props;

  const router = useRouter();
  const path = `/${storeSlug}${RoutePathEnum.CATEGORIES}`;

  // const { getCategoryList: getCategory } = useCategoryList(
  //   useShallow((state) => ({
  //     getCategoryList: state.fetchCategoryList,
  //   })),
  // );

  const { billboardList, fetchBillboardList } = useBillboardList(
    useShallow((state) => ({
      billboardList: state.billboardList,
      fetchBillboardList: state.fetchBillboardList,
    })),
  );

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const { getCategoryCurrent, resetCategory, category, loading } =
    useCategoryUpdate(
      useShallow((state) => ({
        category: state.category,
        getCategoryCurrent: state.getCategoryCurrent,
        loading: state.loading,
        resetCategory: state.resetCategory,
      })),
    );

  const onSucces = useCallback(() => {
    // revalidation category list
    // getCategory(storeSlug);
    resetCategory();
    router.push(path);
    router.refresh();
  }, [resetCategory, path, router, storeSlug]);

  useEffect(() => {
    getCategoryCurrent();
  }, []);

  useEffect(() => {
    if (storeSlug) {
      fetchBillboardList(storeSlug);
    }
  }, [storeSlug, fetchBillboardList]);

  return (
    <>
      {category && (
        <CategoryUpdate
          onSuccess={onSucces}
          storeId={storeId}
          category={category}
          billboardList={billboardList}
        />
      )}
    </>
  );
};
