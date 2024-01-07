import {
  OptionFormTypeSchema,
  optionFormSchema,
} from "@/fsd/entity/OptionForm";

export const optionUpdateValidate = (data: OptionFormTypeSchema) => {
  const { name, value, datatype } = data;
  const validateFields = optionFormSchema.safeParse({
    name,
    datatype,
    value,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
