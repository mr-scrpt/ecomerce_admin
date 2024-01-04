// import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { StoreCreate } from "./StoreCreate";

interface StoreCreateModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const StoreCreateModal: FC<StoreCreateModalProps> = memo((props) => {
  const { onClose } = props;
  // const router = useRouter();
  const onSuccess = useCallback(
    (path: string) => {
      // router.push(path);
      window.location.assign(`/${path}`);
      onClose();
    },
    [onClose],
  );

  return <StoreCreate onCancel={onClose} onSuccess={onSuccess} />;
});
