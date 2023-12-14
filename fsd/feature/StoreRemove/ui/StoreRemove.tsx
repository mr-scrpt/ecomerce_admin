"use client";
import { storeAction } from "@/fsd/entity/Store";
import { useStoreData } from "@/fsd/entity/Store/model/store/store.store";
import { Button } from "@/fsd/shared/ui/button";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState } from "react";
import toast from "react-hot-toast";

interface StoreRemoveProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const StoreRemove: FC<StoreRemoveProps> = (props) => {
  const { onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { storeCurrent } = useStoreData(({ storeCurrent }) => ({
    storeCurrent,
  }));
  const router = useRouter();
  const onDelete = async () => {
    if (storeCurrent) {
      try {
        setIsLoading(true);
        const { data, error } = await storeAction.removeStore(
          storeCurrent.id,
        );
        if (!data && error) {
          toast.error(error);
        }

        if (data) {
          onClose();
          router.replace(origin);
          toast.success(`Store ${data.name} has bean deleted.`);
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button disabled={isLoading} variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button disabled={isLoading} variant="destructive" onClick={onDelete}>
        Continue
      </Button>
    </div>
  );
};
