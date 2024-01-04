"use client";
import { useCategoryList, useCategoryRemove } from "@/fsd/entity/Category";
import { useCategoryRemoveModal } from "@/fsd/feature/ModalManager";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import { FC, HTMLAttributes, useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { categoryCollumns } from "../data/columns";
import { buildCategoryRow } from "../lib/buildCategoryRow";
import { CategoryColumn } from "../type/table.type";
import { CategoryTableAction } from "./CategoryTableAction";

interface CategoryTableWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const CategoryTableWidget: FC<CategoryTableWidgetProps> = (props) => {
  const { slug } = props;

  const { categoryList, fetchCategoryList } = useCategoryList(
    useShallow((state) => ({
      categoryList: state.categoryList,
      fetchCategoryList: state.fetchCategoryList,
    })),
  );

  useEffect(() => {
    fetchCategoryList(slug);
  }, []);

  // const router = useRouter();

  const { onOpen } = useCategoryRemoveModal(
    useShallow((state) => ({
      onOpen: state.onOpen,
    })),
  );

  const { setIdToRemove } = useCategoryRemove(
    useShallow((state) => ({
      setIdToRemove: state.setId,
    })),
  );

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category ID copied to clipboard.");
  };

  const onDeletePopup = useCallback(
    (categoryId: string) => {
      setIdToRemove(categoryId);

      onOpen();
    },
    [onOpen, setIdToRemove],
  );

  const updateHref = useCallback((categorySlug: string) => {
    return `${RoutePathEnum.CATEGORIES_EDIT}/${categorySlug}`;
  }, []);

  const categoryCollumnsWithAction: ColumnDef<CategoryColumn>[] = [
    ...categoryCollumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <CategoryTableAction
          data={row.original}
          onCopy={onCopy.bind(null, row.original.id)}
          hrefUpdate={updateHref(row.original.slug)}
          onDeletePopup={onDeletePopup.bind(null, row.original.id)}
        />
      ),
    },
  ];

  const listFormated = useMemo(
    () => categoryList.map((item) => buildCategoryRow(item)),
    [categoryList],
  );
  return (
    <TableData
      columns={categoryCollumnsWithAction}
      data={listFormated}
      filterKey="name"
    />
  );
};
