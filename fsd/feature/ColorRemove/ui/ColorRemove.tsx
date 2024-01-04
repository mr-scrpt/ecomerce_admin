"use client";
import { colorAction } from "@/fsd/entity/Color";
import { Button } from "@/fsd/shared/ui/button";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ColorRemoveProps extends HTMLAttributes<HTMLDivElement> {
  colorId: string;
  onSuccess?: () => void;
  onCancel: () => void;
}

export const ColorRemove: FC<ColorRemoveProps> = memo((props) => {
  const { colorId, onSuccess, onCancel } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await colorAction.removeColor(colorId);
      if (!data && error) {
        toast.error(error);
      }

      if (data) {
        onSuccess?.();
        toast.success(`Color ${data.name} has bean deleted.`);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      onCancel();
    }
  }, [colorId, onSuccess, onCancel]);

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
