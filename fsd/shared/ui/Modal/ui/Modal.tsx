import { FC, HTMLAttributes, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/fsd/shared/ui/dialog";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  footer?: ReactNode;
}

export const Modal: FC<ModalProps> = (props) => {
  // const { onClose, isOpen, title, description, children } = props;
  // if (isOpen) return null;
  // return (
  //   <Modal
  //     title={title}
  //     description={description}
  //     isOpen={isOpen}
  //     onClose={onClose}
  //   >
  //     {children}
  //   </Modal>
  // );
  const { title, description, isOpen, onClose, children, footer } = props;
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose?.();
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
