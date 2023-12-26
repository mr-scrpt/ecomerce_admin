"use client";
import { useCategoryRemove, useCategoryUpdate } from "@/fsd/entity/Category";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { useCategoryRemoveModal } from "../../ModalManager/model/store/modal.store";
import { IStoreCategoryTableItem } from "../type/store.type";
import { CategoryColumn } from "../type/table.type";
import { CategoryTableListAction } from "./CategoryTableListAction";
import { categoryCollumns } from "../data/columns";

interface CategoryTableListProps extends HTMLAttributes<HTMLDivElement> {
  categoryList: IStoreCategoryTableItem[];
}

export const CategoryTableList: FC<CategoryTableListProps> = memo((props) => {
  const { categoryList } = props;
  const router = useRouter();

  const { onOpen } = useCategoryRemoveModal(
    useShallow((state) => ({
      onOpen: state.onOpen,
    })),
  );

  const { setIdToUpdate } = useCategoryUpdate(
    useShallow((state) => ({
      setIdToUpdate: state.setId,
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

  const onDeletePopup = (categoryId: string) => {
    setIdToRemove(categoryId);

    onOpen();
  };

  const onUpdate = (categoryId: string) => {
    setIdToUpdate(categoryId);
    router.push(`${RoutePathEnum.CATEGORIES_EDIT}`);
  };

  const categoryCollumnsWithAction: ColumnDef<CategoryColumn>[] = [
    ...categoryCollumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <CategoryTableListAction
          data={row.original}
          onCopy={onCopy.bind(null, row.original.id)}
          onUpdate={onUpdate.bind(null, row.original.id)}
          onDeletePopup={onDeletePopup.bind(null, row.original.id)}
        />
      ),
    },
  ];
  return (
    <TableData
      columns={categoryCollumnsWithAction}
      data={categoryList}
      filterKey="name"
    />
  );
});
