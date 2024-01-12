import { IBillboard, billboardListBuilder } from "@/fsd/entity/Billboard";
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
import { optionListIdBuilder } from "../../CategoryCreate/lib/optionListBuilder";

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

        const { name, billboardId, optionList } = form;
        const optionListIdBuild = optionListIdBuilder(optionList);
        const { data, error } = await categoryAction.updateCategory({
          name,
          billboardId,
          optionListId: optionListIdBuild,
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

  const billboardListBuild = useMemo(
    () => billboardListBuilder(billboardList),
    [billboardList],
  );

  const defaultValues = { ...category, optionList: optionListSeletedBuild };

  return (
    <CategoryForm
      onAction={onSubmit}
      actionName="Update"
      defaultValues={defaultValues}
      loading={loading}
      billboardList={billboardListBuild}
      optionList={optionListBuild}
    />
  );
});
