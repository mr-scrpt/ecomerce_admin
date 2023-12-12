import { FC, HTMLAttributes, ReactNode, memo, useCallback } from "react";
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

export const Modal: FC<ModalProps> = memo((props) => {
  const { title, description, isOpen, onClose, children, footer } = props;
  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) onClose?.();
    },
    [onClose],
  );
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
});
