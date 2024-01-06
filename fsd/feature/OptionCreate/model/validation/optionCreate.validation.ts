// import { OptionCreateTypeSchema, optionCreateSchema } from "../../type/schema.type";

import {
  OptionFormTypeSchema,
  optionFormSchema,
} from "@/fsd/entity/OptionForm";

export const optionCreateValidate = (data: OptionFormTypeSchema) => {
  const { name, value, datatype } = data;
  const validateFields = optionFormSchema.safeParse({
    name,
    value,
    datatype,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
