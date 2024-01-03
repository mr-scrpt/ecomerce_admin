"use client";
import { FC, HTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";

import { IBillboard, billboardAction } from "@/fsd/entity/Billboard";
import {
  BillboardForm,
  BillboardFormTypeSchema,
} from "@/fsd/entity/BillboardForm";
import { billboardUpdateValidate } from "../model/validation/billboardUpdate.validation";

interface BillboardUpdateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  billboard: IBillboard;
}

export const BillboardUpdate: FC<BillboardUpdateProps> = (props) => {
  const { onSuccess, storeId, billboard } = props;
  const { id } = billboard;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (form: BillboardFormTypeSchema) => {
    try {
      setLoading(true);

      if (!storeId) {
        return toast.error("Store Not Found");
      }

      const validation = billboardUpdateValidate(form);

      if (validation?.errors) {
        return toast.error("Incorrect data from the form");
      }

      const { name, imgUrl } = form;
      const { data, error } = await billboardAction.updateBillboard({
        name,
        imgUrl,
        storeId,
        billboardId: id,
      });
      if (error) {
        toast.error(error);
      }
      if (data) {
        toast.success(`Billboard has been updated by name ${name}`);
        onSuccess?.();
      }
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BillboardForm
      onAction={onSubmit}
      actionName="Update"
      defaultValues={billboard}
      loading={loading}
    />
  );
};
