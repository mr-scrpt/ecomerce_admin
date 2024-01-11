"use client";
import {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";

import { categoryAction } from "@/fsd/entity/Category";
import {
  CategoryForm,
  CategoryFormTypeSchema,
} from "@/fsd/entity/CategoryForm";
import { categoryCreateValidate } from "../../model/validation/categoryCreate.validation";
import { IBillboard, billboardListBuilder } from "@/fsd/entity/Billboard";
import { IOption, optionListBuilder } from "@/fsd/entity/Option";
import { optionListIdBuilder } from "../../lib/optionListBuilder";

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

      const { name, billboardId, optionListId } = form;

      const optionListIdBuild = optionListIdBuilder(optionListId);

      const { data, error } = await categoryAction.createCategory({
        name,
        billboardId,
        optionListId: optionListIdBuild,
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

  const optionListBuild = useMemo(
    () => optionListBuilder(optionList),
    [optionList],
  );

  const billboardListBuild = useMemo(
    () => billboardListBuilder(billboardList),
    [billboardList],
  );
  const defaultValues = { name: "", billboardId: "", optionList: [] };

  return (
    <CategoryForm
      onAction={onSubmit}
      actionName="Create"
      defaultValues={defaultValues}
      loading={loading}
      billboardList={billboardListBuild}
      optionList={optionListBuild}
    />
  );
});
