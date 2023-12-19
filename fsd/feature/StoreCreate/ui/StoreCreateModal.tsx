import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { StoreCreate } from "./StoreCreate";

interface StoreCreateModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const StoreCreateModal: FC<StoreCreateModalProps> = (props) => {
  const { onClose } = props;
  const router = useRouter();
  const onSuccess = useCallback((path: string) => {
    router.push(path);
    onClose();
  }, []);

  return <StoreCreate onCancel={onClose} onSuccess={onSuccess} />;
};
