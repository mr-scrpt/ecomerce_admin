import {
  CategoryUpdateTypeSchema,
  categoryUpdateSchema,
} from "../../type/schema.type";

export const categoryUpdateValidate = (data: CategoryUpdateTypeSchema) => {
  const { name, billboardId } = data;
  const validateFields = categoryUpdateSchema.safeParse({
    name,
    billboardId,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
