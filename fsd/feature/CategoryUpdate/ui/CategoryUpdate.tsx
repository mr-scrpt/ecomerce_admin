import { IBillboard } from "@/fsd/entity/Billboard";
import { ICategory, categoryAction } from "@/fsd/entity/Category";
import {
  CategoryForm,
  CategoryFormTypeSchema,
} from "@/fsd/entity/CategoryForm";
import { IOption, optionListBuilder } from "@/fsd/entity/Option";
import {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { categoryUpdateValidate } from "../model/validation/categoryUpdate.validation";

interface CategoryUpdateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  category: ICategory;
  billboardList: IBillboard[];
  optionList: IOption[];
  optionListSelected: IOption[];
}

export const CategoryUpdate: FC<CategoryUpdateProps> = memo((props) => {
  const {
    onSuccess,
    storeId,
    category,
    billboardList,
    optionList,
    optionListSelected,
  } = props;
  const { id } = category;
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (form: CategoryFormTypeSchema) => {
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
    },
    [storeId, id, onSuccess],
  );
  const optionListSeletedBuild = useMemo(
    () => optionListBuilder(optionListSelected),
    [optionListSelected],
  );

  const optionListBuild = useMemo(
    () => optionListBuilder(optionList),
    [optionList],
  );

  const defaultValues = { ...category, optionListId: optionListSeletedBuild };

  return (
    <CategoryForm
      onAction={onSubmit}
      actionName="Update"
      defaultValues={defaultValues}
      loading={loading}
      billboardList={billboardList}
      optionList={optionListBuild}
      optionListSelected={optionListSeletedBuild}
    />
  );
});
