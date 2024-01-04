"use client";
import { billboardAction } from "@/fsd/entity/Billboard";
import { Button } from "@/fsd/shared/ui/button";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface BillboardRemoveProps extends HTMLAttributes<HTMLDivElement> {
  billboardId: string;
  onSuccess?: () => void;
  onCancel: () => void;
}

export const BillboardRemove: FC<BillboardRemoveProps> = memo((props) => {
  const { billboardId, onSuccess, onCancel } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } =
        await billboardAction.removeBillboard(billboardId);
      if (!data && error) {
        toast.error(error);
      }

      if (data) {
        onSuccess?.();
        toast.success(`Billboard ${data.name} has bean deleted.`);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      onCancel();
    }
  }, [billboardId, onSuccess, onCancel]);

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
