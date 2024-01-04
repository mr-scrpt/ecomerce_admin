import { ISize, sizeAction } from "@/fsd/entity/Size";
import { SizeForm, SizeFormTypeSchema } from "@/fsd/entity/SizeForm";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { sizeUpdateValidate } from "../model/validation/sizeUpdate.validation";

interface SizeUpdateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  size: ISize;
  // billboardList: IBillboard[];
}

export const SizeUpdate: FC<SizeUpdateProps> = memo((props) => {
  const { onSuccess, storeId, size } = props;
  const { id } = size;
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (form: SizeFormTypeSchema) => {
      try {
        setLoading(true);

        if (!storeId) {
          return toast.error("Store Not Found");
        }

        const validation = sizeUpdateValidate(form);

        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }

        const { name, value } = form;
        const { data, error } = await sizeAction.updateSize({
          name,
          value,
          storeId,
          sizeId: id,
        });

        if (error) {
          toast.error(error);
        }
        if (data) {
          toast.success(`Size has been created by name ${name}`);
          onSuccess?.();
        }
      } catch (e) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [id, storeId, onSuccess],
  );

  return (
    <SizeForm
      onAction={onSubmit}
      actionName="Update"
      defaultValues={size}
      loading={loading}
    />
  );
});
