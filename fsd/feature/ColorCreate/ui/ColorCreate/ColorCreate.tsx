"use client";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { colorAction } from "@/fsd/entity/Color";
import { ColorForm, ColorFormTypeSchema } from "@/fsd/entity/ColorForm";
import { colorCreateValidate } from "../../model/validation/colorCreate.validation";

interface ColorCreateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  // value: string;
}

export const ColorCreate: FC<ColorCreateProps> = memo((props) => {
  const { onSuccess, storeId } = props;
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (form: ColorFormTypeSchema) => {
      try {
        setLoading(true);

        if (!storeId) {
          return toast.error("Store Not Found");
        }

        const validation = colorCreateValidate(form);

        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }

        const { name, value } = form;
        const { data, error } = await colorAction.createColor({
          name,
          value,
          storeId,
        });

        if (error) {
          toast.error(error);
        }
        if (data) {
          toast.success(`Color has been created by name ${name}`);
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
    <ColorForm
      onAction={onSubmit}
      actionName="Create"
      defaultValues={defaultValues}
      loading={loading}
    />
  );
});
