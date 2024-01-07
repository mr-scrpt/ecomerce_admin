import { IOption, optionAction } from "@/fsd/entity/Option";
import { OptionForm, OptionFormTypeSchema } from "@/fsd/entity/OptionForm";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { optionUpdateValidate } from "../model/validation/optionUpdate.validation";
import { IOptionListWithRelations } from "@/fsd/entity/Option/type/entity.type";

interface OptionUpdateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "option"> {
  onSuccess?: () => void;
  storeId?: string;
  option: IOptionListWithRelations;
}

export const OptionUpdate: FC<OptionUpdateProps> = memo((props) => {
  const { onSuccess, storeId, option } = props;
  const { id } = option;
  const [loading, setLoading] = useState(false);

  console.log("option =>>>", option);
  const onSubmit = useCallback(
    async (form: OptionFormTypeSchema) => {
      try {
        setLoading(true);

        if (!storeId) {
          return toast.error("Store Not Found");
        }

        console.log("form =>>>", form);
        const validation = optionUpdateValidate(form);

        if (validation?.errors) {
          console.log(" =>>>", validation.errors);
          return toast.error("Incorrect data from the form");
        }

        const { name, value, datatype } = form;

        const { data, error } = await optionAction.updateOption({
          name,
          datatype,
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
