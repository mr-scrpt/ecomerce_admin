import { billboardAction } from "@/fsd/entity/Billboard";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState } from "react";

interface BillboardRemoveProps extends HTMLAttributes<HTMLDivElement> {
  billboardId: string;
  onSuccess: () => void;
  onCancel: () => void;
  onSuccesUrlRedirect: string;
}

export const BillboardRemove: FC<BillboardRemoveProps> = (props) => {
  const { billboardId, onSuccess, onCancel, onSuccesUrlRedirect } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await billboardAction.remo(storeCurrent.id);
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

  return <div>BillboardRemove</div>;
};
