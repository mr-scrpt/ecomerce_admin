import {
  CategoryCreateTypeSchema,
  categoryCreateSchema,
} from "../../type/schema.type";

export const categoryCreateValidate = (data: CategoryCreateTypeSchema) => {
  const { name, billboardId } = data;
  const validateFields = categoryCreateSchema.safeParse({
    name,
    billboardId,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
