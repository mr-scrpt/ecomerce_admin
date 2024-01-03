import { ICategory, categoryAction } from "@/fsd/entity/Category";
import {
  CategoryForm,
  CategoryFormTypeSchema,
} from "@/fsd/entity/CategoryForm";
import { FC, HTMLAttributes, useState } from "react";
import toast from "react-hot-toast";
import { categoryUpdateValidate } from "../model/validation/categoryUpdate.validation";
import { IBillboard } from "@/fsd/entity/Billboard";

interface CategoryUpdateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  category: ICategory;
  billboardList: IBillboard[];
}

export const CategoryUpdate: FC<CategoryUpdateProps> = (props) => {
  const { onSuccess, storeId, category, billboardList } = props;
  const { id } = category;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (form: CategoryFormTypeSchema) => {
    try {
      setLoading(true);

      if (!storeId) {
        return toast.error("Store Not Found");
      }

      const validation = categoryUpdateValidate(form);

      if (validation?.errors) {
        return toast.error("Incorrect data from the form");
      }

      const { name, billboardId } = form;
      const { data, error } = await categoryAction.updateCategory({
        name,
        billboardId,
        storeId,
        categoryId: id,
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
  return (
    <CategoryForm
      onAction={onSubmit}
      actionName="Update"
      defaultValues={category}
      loading={loading}
      billboardList={billboardList}
    />
  );
};
