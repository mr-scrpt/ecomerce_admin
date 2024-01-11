import {
  CategoryFormTypeSchema,
  categoryFormSchema,
} from "@/fsd/entity/CategoryForm";

export const categoryCreateValidate = (data: CategoryFormTypeSchema) => {
  const { name, billboardId, optionListId } = data;
  const validateFields = categoryFormSchema.safeParse({
    name,
    billboardId,
    optionListId,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
