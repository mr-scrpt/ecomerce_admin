import { ColorFormTypeSchema, colorFormSchema } from "@/fsd/entity/ColorForm";

export const colorUpdateValidate = (data: ColorFormTypeSchema) => {
  const { name, value } = data;
  const validateFields = colorFormSchema.safeParse({
    name,
    value,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
