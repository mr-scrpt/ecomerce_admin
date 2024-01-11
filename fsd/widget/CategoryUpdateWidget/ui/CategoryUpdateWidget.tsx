"use client";
import { useBillboardList } from "@/fsd/entity/Billboard";
import { useOptionListCategory, useOptionListStore } from "@/fsd/entity/Option";
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
  categorySlug: string;
}

export const CategoryUpdateWidget: FC<CategoryUpdateWidgetProps> = (props) => {
  const { storeSlug, categorySlug } = props;

  const router = useRouter();
  const path = `/${storeSlug}${RoutePathEnum.CATEGORIES}`;

  const { billboardList, fetchBillboardList } = useBillboardList(
    useShallow((state) => ({
      billboardList: state.billboardList,
      fetchBillboardList: state.fetchBillboardList,
    })),
  );

  const { optionListCategory, fetchOptionListCategory } = useOptionListCategory(
    useShallow((state) => ({
      optionListCategory: state.optionList,
      fetchOptionListCategory: state.fetchOptionListByStoreId,
    })),
  );

  const { optionListStore, fetchOptionListStore } = useOptionListStore(
    useShallow((state) => ({
      optionListStore: state.optionList,
      fetchOptionListStore: state.fetchOptionListByStoreId,
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
    resetCategory();
    router.push(path);
    router.refresh();
  }, [resetCategory, path, router]);

  useEffect(() => {
    getCategoryCurrent({ categorySlug, storeSlug });
  }, [getCategoryCurrent, categorySlug, storeSlug]);

  useEffect(() => {
    if (storeId) {
      fetchBillboardList(storeId);
    }
  }, [storeId, fetchBillboardList]);

  useEffect(() => {
    if (category?.id) {
      fetchOptionListCategory(category.id);
    }
  }, [category?.id, fetchOptionListCategory]);

  useEffect(() => {
    if (storeId) {
      fetchOptionListStore(storeId);
    }
  }, [storeId, fetchOptionListStore]);

  return (
    <>
      {category && (
        <CategoryUpdate
          onSuccess={onSucces}
          storeId={storeId}
          category={category}
          billboardList={billboardList}
          optionList={optionListStore}
          optionListSelected={optionListCategory}
        />
      )}
    </>
  );
};
