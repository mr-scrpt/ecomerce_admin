"use client";

import { FC, HTMLAttributes, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  isOpen: boolean;
  onClose?: () => void;
  footer?: ReactNode;
}

export const Modal: FC<ModalProps> = (props) => {
  const { title, description, isOpen, onClose, children, footer } = props;
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose?.();
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        {/* <DialogFooter>{footer}</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
