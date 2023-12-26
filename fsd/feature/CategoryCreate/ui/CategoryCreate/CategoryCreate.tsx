"use client";
import { FC, HTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";

import { billboardAction } from "@/fsd/entity/Category";
import { categoryCreateValidate } from "../../model/action/validation.action";
import { CategoryCreateTypeSchema } from "../../type/schema.type";
import { CategoryForm } from "@/fsd/entity/CategoryForm";

interface CategoryCreateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
}

export const CategoryCreate: FC<CategoryCreateProps> = (props) => {
  const { onSuccess, storeId } = props;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (form: CategoryCreateTypeSchema) => {
    try {
      setLoading(true);

      if (!storeId) {
        return toast.error("Store Not Found");
      }

      const validation = categoryCreateValidate(form);

      if (validation?.errors) {
        return toast.error("Incorrect data from the form");
      }

      const { name, billboardId } = form;
      const { data, error } = await billboardAction.createCategory({
        name,
        billboardId,
        storeId,
      });
      if (error) {
        toast.error(error);
      }
      if (data) {
        toast.success(`Category has been created by name ${name}`);
        onSuccess?.();
      }
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const defaultValues = { name: "", billboardId: "" };

  return (
    <CategoryForm
      onAction={onSubmit}
      actionName="Create"
      defaultValues={defaultValues}
      loading={loading}
      billboardList={[]}
    />
  );
};
