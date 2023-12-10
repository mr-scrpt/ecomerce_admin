"use client";
import { Button } from "@/fsd/shared/ui/button";
import { Trash } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { useStoreRemoveModal } from "../../model/store/modal.store";

interface OpenModalStoreRemoveProps extends HTMLAttributes<HTMLDivElement> {}

export const OpenModalStoreRemove: FC<OpenModalStoreRemoveProps> = (props) => {
  const { onOpen } = useStoreRemoveModal(({ onOpen }) => ({ onOpen }));
  return (
    <Button variant="destructive" size="icon" onClick={onOpen}>
      <Trash className="w-4 h-4" />
    </Button>
  );
};
