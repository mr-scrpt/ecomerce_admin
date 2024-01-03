"use client";
import { FC, HTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";

import { billboardAction } from "@/fsd/entity/Billboard";
import {
  BillboardForm,
  BillboardFormTypeSchema,
} from "@/fsd/entity/BillboardForm";
import { billboardCreateValidate } from "../../model/validation/billboardCreate.validation";

interface BillboardCreateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
}

export const BillboardCreate: FC<BillboardCreateProps> = (props) => {
  const { onSuccess, storeId } = props;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (form: BillboardFormTypeSchema) => {
    try {
      setLoading(true);

      if (!storeId) {
        return toast.error("Store Not Found");
      }

      const validation = billboardCreateValidate(form);

      if (validation?.errors) {
        return toast.error("Incorrect data from the form");
      }

      const { name, imgUrl } = form;
      const { data, error } = await billboardAction.createBillboard({
        name,
        imgUrl,
        storeId,
      });
      if (error) {
        toast.error(error);
      }
      if (data) {
        toast.success(`Billboard has been created by name ${name}`);
        onSuccess?.();
      }
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const defaultValues = { name: "", imgUrl: "" };

  return (
    <BillboardForm
      onAction={onSubmit}
      actionName="Create"
      defaultValues={defaultValues}
      loading={loading}
    />
  );
};
