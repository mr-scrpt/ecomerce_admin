"use client";
import { sizeAction } from "@/fsd/entity/Size";
import { Button } from "@/fsd/shared/ui/button";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface SizeRemoveProps extends HTMLAttributes<HTMLDivElement> {
  sizeId: string;
  onSuccess?: () => void;
  onCancel: () => void;
}

export const SizeRemove: FC<SizeRemoveProps> = memo((props) => {
  const { sizeId, onSuccess, onCancel } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await sizeAction.removeSize(sizeId);
      if (!data && error) {
        toast.error(error);
      }

      if (data) {
        onSuccess?.();
        toast.success(`Size ${data.name} has bean deleted.`);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      onCancel();
    }
  }, [sizeId, onSuccess, onCancel]);

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
