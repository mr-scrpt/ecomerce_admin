"use client";
import { storeAction } from "@/fsd/entity/Store";
import { Button } from "@/fsd/shared/ui/button";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface StoreRemoveProps extends HTMLAttributes<HTMLDivElement> {
  storeId: string;
  onSuccess?: () => void;
  onCancel: () => void;
}

export const StoreRemove: FC<StoreRemoveProps> = memo((props) => {
  const { onSuccess, onCancel, storeId } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await storeAction.removeStore(storeId);
      if (!data && error) {
        toast.error(error);
      }

      if (data) {
        onSuccess?.();
        toast.success(`Store ${data.name} has bean deleted.`);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [storeId, onSuccess]);

  return (
    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button disabled={isLoading} variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button disabled={isLoading} variant="destructive" onClick={onDelete}>
        Continue
      </Button>
    </div>
  );
});
