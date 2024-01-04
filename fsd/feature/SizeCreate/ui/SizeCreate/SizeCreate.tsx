"use client";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { sizeAction } from "@/fsd/entity/Size";
import { SizeForm, SizeFormTypeSchema } from "@/fsd/entity/SizeForm";
import { sizeCreateValidate } from "../../model/validation/sizeCreate.validation";

interface SizeCreateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  // value: string;
}

export const SizeCreate: FC<SizeCreateProps> = memo((props) => {
  const { onSuccess, storeId } = props;
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (form: SizeFormTypeSchema) => {
      try {
        setLoading(true);

        if (!storeId) {
          return toast.error("Store Not Found");
        }

        const validation = sizeCreateValidate(form);

        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }

        const { name, value } = form;
        const { data, error } = await sizeAction.createSize({
          name,
          value,
          storeId,
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
    [storeId, onSuccess],
  );

  const defaultValues = { name: "", value: "" };

  return (
    <SizeForm
      onAction={onSubmit}
      actionName="Create"
      defaultValues={defaultValues}
      loading={loading}
    />
  );
});
