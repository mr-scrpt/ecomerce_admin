import { FC, HTMLAttributes } from "react";
import { StoreCreate } from "./StoreCreate";

interface StoreCreateModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const StoreCreateModal: FC<StoreCreateModalProps> = (props) => {
  return <StoreCreate onCancel={onCloseStoreCreate} />;
};
