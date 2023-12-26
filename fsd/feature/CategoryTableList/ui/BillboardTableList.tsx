"use client";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { TableData } from "@/fsd/shared/ui/TableData/ui/TableData";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { useCategoryRemove } from "../../CategoryRemove";
import { useCategoryUpdate } from "../../CategoryUpdate";
import { useCategoryRemoveModal } from "../../ModalManager/model/store/modal.store";
import { billboardCollumns } from "../data/columns";
import { IStoreCategoryTableItem } from "../type/store.type";
import { CategoryColumn } from "../type/table.type";
import { CategoryTableListAction } from "./CategoryTableListAction";

interface CategoryTableListProps extends HTMLAttributes<HTMLDivElement> {
  billboardList: IStoreCategoryTableItem[];
}

export const CategoryTableList: FC<CategoryTableListProps> = memo((props) => {
  const { billboardList } = props;
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

  const onDeletePopup = (billboardId: string) => {
    setIdToRemove(billboardId);

    onOpen();
  };

  const onUpdate = (billboardId: string) => {
    // console.log(" =>>> update", billboardId);
    setIdToUpdate(billboardId);
    router.push(`${RoutePathEnum.BILLBOARDS_EDIT}`);
  };

  const billboardCollumnsWithAction: ColumnDef<CategoryColumn>[] = [
    ...billboardCollumns,
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
      columns={billboardCollumnsWithAction}
      data={billboardList}
      filterKey="name"
    />
  );
});
