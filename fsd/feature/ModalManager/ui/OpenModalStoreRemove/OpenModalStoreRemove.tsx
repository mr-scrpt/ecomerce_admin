"use client";
import { Button } from "@/fsd/shared/ui/button";
import { Trash } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { useStoreRemoveModal } from "../../model/store/modal.store";
import { useShallow } from "zustand/react/shallow";

interface OpenModalStoreRemoveProps extends HTMLAttributes<HTMLDivElement> {}

export const OpenModalStoreRemove: FC<OpenModalStoreRemoveProps> = () => {
  const { onOpen } = useStoreRemoveModal(
    useShallow(({ onOpen }) => ({ onOpen })),
  );
  return (
    <Button variant="destructive" size="icon" onClick={onOpen}>
      <Trash className="w-4 h-4" />
    </Button>
  );
};
