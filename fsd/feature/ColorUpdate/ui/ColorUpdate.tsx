import { IColor, colorAction } from "@/fsd/entity/Color";
import { ColorForm, ColorFormTypeSchema } from "@/fsd/entity/ColorForm";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { colorUpdateValidate } from "../model/validation/colorUpdate.validation";

interface ColorUpdateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  onSuccess?: () => void;
  storeId?: string;
  color: IColor;
  // billboardList: IBillboard[];
}

export const ColorUpdate: FC<ColorUpdateProps> = memo((props) => {
  const { onSuccess, storeId, color } = props;
  const { id } = color;
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (form: ColorFormTypeSchema) => {
      try {
        setLoading(true);

        if (!storeId) {
          return toast.error("Store Not Found");
        }

        const validation = colorUpdateValidate(form);

        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }

        const { name, value } = form;
        const { data, error } = await colorAction.updateColor({
          name,
          value,
          storeId,
          colorId: id,
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
    [id, storeId, onSuccess],
  );

  return (
    <ColorForm
      onAction={onSubmit}
      actionName="Update"
      defaultValues={color}
      loading={loading}
    />
  );
});
