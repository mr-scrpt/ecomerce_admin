// import { SizeCreateTypeSchema, sizeCreateSchema } from "../../type/schema.type";

import { SizeFormTypeSchema, sizeFormSchema } from "@/fsd/entity/SizeForm";

export const sizeCreateValidate = (data: SizeFormTypeSchema) => {
  const { name, value } = data;
  const validateFields = sizeFormSchema.safeParse({
    name,
    value,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
