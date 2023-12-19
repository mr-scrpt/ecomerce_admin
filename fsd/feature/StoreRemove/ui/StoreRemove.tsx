"use client";
import { storeAction } from "@/fsd/entity/Store";
import { useStoreData } from "@/fsd/entity/Store/model/store/store.store";
import { Button } from "@/fsd/shared/ui/button";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState } from "react";
import toast from "react-hot-toast";

interface StoreRemoveProps extends HTMLAttributes<HTMLDivElement> {
  storeId: string;
  onSuccess: () => void;
  onCancel: () => void;
  onSuccesUrlRedirect: string;
}

export const StoreRemove: FC<StoreRemoveProps> = (props) => {
  const { onSuccess, onCancel, onSuccesUrlRedirect, storeId } = props;
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onDelete = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await storeAction.removeStore(storeId);
      if (!data && error) {
        toast.error(error);
      }

      if (data) {
        onSuccess();
        toast.success(`Store ${data.name} has bean deleted.`);
        if (onSuccesUrlRedirect) {
          router.replace(onSuccesUrlRedirect);
        }
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

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
};
