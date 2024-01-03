import {
  CategoryFormTypeSchema,
  categoryFormSchema,
} from "@/fsd/entity/CategoryForm";

export const categoryUpdateValidate = (data: CategoryFormTypeSchema) => {
  const { name, billboardId } = data;
  const validateFields = categoryFormSchema.safeParse({
    name,
    billboardId,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
