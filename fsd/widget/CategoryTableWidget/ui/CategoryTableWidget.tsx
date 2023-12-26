"use client";
import { CategoryTableList } from "@/fsd/feature/CategoryTableList";
import { useCategoryTableData } from "@/fsd/feature/CategoryTableList/model/store/category.store";
import { FC, HTMLAttributes, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface CategoryTableWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const CategoryTableWidget: FC<CategoryTableWidgetProps> = (props) => {
  const { slug } = props;
  const { categoryList, fetchCategoryList } = useCategoryTableData(
    useShallow((state) => ({
      categoryList: state.list,
      fetchCategoryList: state.fetchCategoryListByStoreSlug,
    })),
  );
  useEffect(() => {
    fetchCategoryList(slug);
  }, []);
  return <CategoryTableList categoryList={categoryList} />;
};
