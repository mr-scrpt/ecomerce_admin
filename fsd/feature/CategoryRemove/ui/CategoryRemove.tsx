"use client";
import { categoryAction } from "@/fsd/entity/Category";
import { Button } from "@/fsd/shared/ui/button";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface CategoryRemoveProps extends HTMLAttributes<HTMLDivElement> {
  categoryId: string;
  onSuccess?: () => void;
  onCancel: () => void;
}

export const CategoryRemove: FC<CategoryRemoveProps> = memo((props) => {
  const { categoryId, onSuccess, onCancel } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await categoryAction.removeCategory(categoryId);
      if (!data && error) {
        toast.error(error);
      }

      if (data) {
        onSuccess?.();
        toast.success(`Category ${data.name} has bean deleted.`);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      onCancel();
    }
  }, [categoryId, onSuccess, onCancel]);

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
