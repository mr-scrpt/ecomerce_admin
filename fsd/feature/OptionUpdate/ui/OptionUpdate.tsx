import { IOption, optionAction } from "@/fsd/entity/Option";
import { OptionForm, OptionFormTypeSchema } from "@/fsd/entity/OptionForm";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { optionUpdateValidate } from "../model/validation/optionUpdate.validation";

interface OptionUpdateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "option"> {
  onSuccess?: () => void;
  storeId?: string;
  option: IOption;
  // billboardList: IBillboard[];
}

export const OptionUpdate: FC<OptionUpdateProps> = memo((props) => {
  const { onSuccess, storeId, option } = props;
  const { id } = option;
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (form: OptionFormTypeSchema) => {
      try {
        setLoading(true);

        if (!storeId) {
          return toast.error("Store Not Found");
        }

        const validation = optionUpdateValidate(form);

        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }

        const { name, value } = form;
        const { data, error } = await optionAction.updateOption({
          name,
          value,
          storeId,
          optionId: id,
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
    [id, storeId, onSuccess],
  );

  return (
    <OptionForm
      onAction={onSubmit}
      actionName="Update"
      defaultValues={option}
      loading={loading}
    />
  );
});
