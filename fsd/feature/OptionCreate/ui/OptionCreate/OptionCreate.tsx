"use client";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { optionAction } from "@/fsd/entity/Option";
import { optionCreateValidate } from "../../model/validation/optionCreate.validation";
import { Button } from "@/fsd/shared/ui/button";
import { OptionForm, OptionFormTypeSchema } from "@/fsd/entity/OptionForm";
import { SelectDataTypeEnum } from "@/fsd/entity/Option/type/select.enum";

interface OptionCreateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  // value: string;
}

export const OptionCreate: FC<OptionCreateProps> = memo((props) => {
  const { onSuccess, storeId } = props;
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (form: OptionFormTypeSchema) => {
      try {
        setLoading(true);

        if (!storeId) {
          return toast.error("Store Not Found");
        }

        const validation = optionCreateValidate(form);

        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }

        const { name, value, datatype } = form;
        const { data, error } = await optionAction.createOption({
          name,
          datatype,
          value,
          storeId,
        });

        if (error) {
          toast.error(error);
        }
        if (data) {
          toast.success(`Option has been created by name ${name}`);
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

  const defaultValues = {
    name: "",
    datatype: SelectDataTypeEnum.SELECT,
    value: [{ name: "", value: "" }],
  };

  // return <Button onClick={onSubmit}>Create</Button>;

  return (
    <OptionForm
      onAction={onSubmit}
      actionName="Create"
      defaultValues={defaultValues}
      loading={loading}
    />
  );
});
