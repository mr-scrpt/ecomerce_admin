import {
  OptionFormTypeSchema,
  optionFormSchema,
} from "@/fsd/entity/OptionForm";

export const optionUpdateValidate = (data: OptionFormTypeSchema) => {
  const { name, value } = data;
  const validateFields = optionFormSchema.safeParse({
    name,
    value,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
