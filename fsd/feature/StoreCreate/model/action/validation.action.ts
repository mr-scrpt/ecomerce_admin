import {
  StoreCreateTypeSchema,
  storeCreateSchema,
} from "../../type/schema.type";

export const storeCreateValidate = (data: StoreCreateTypeSchema) => {
  const { name } = data;
  const validateFields = storeCreateSchema.safeParse({
    name,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
