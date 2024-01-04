// import { ColorCreateTypeSchema, colorCreateSchema } from "../../type/schema.type";

import { ColorFormTypeSchema, colorFormSchema } from "@/fsd/entity/ColorForm";

export const colorCreateValidate = (data: ColorFormTypeSchema) => {
  const { name, value } = data;
  const validateFields = colorFormSchema.safeParse({
    name,
    value,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
