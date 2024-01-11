"use client";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { categoryAction } from "@/fsd/entity/Category";
import {
  CategoryForm,
  CategoryFormTypeSchema,
} from "@/fsd/entity/CategoryForm";
import { categoryCreateValidate } from "../../model/validation/categoryCreate.validation";
import { IBillboard } from "@/fsd/entity/Billboard";
import { IOption } from "@/fsd/entity/Option";

interface CategoryCreateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  billboardList: IBillboard[];
  optionList: IOption[];
}

export const CategoryCreate: FC<CategoryCreateProps> = memo((props) => {
  const { onSuccess, storeId, billboardList, optionList } = props;
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (form: CategoryFormTypeSchema) => {
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
      const { data, error } = await categoryAction.createCategory({
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
  }, []);

  const defaultValues = { name: "", billboardId: "", optionId: "" };

  return (
    <CategoryForm
      onAction={onSubmit}
      actionName="Create"
      defaultValues={defaultValues}
      loading={loading}
      billboardList={billboardList}
      optionList={optionList}
    />
  );
});
