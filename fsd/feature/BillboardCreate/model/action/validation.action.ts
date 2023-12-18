import {
  BillboardCreateTypeSchema,
  billboardCreateSchema,
} from "../../type/schema.type";

export const billboardCreateValidate = (data: BillboardCreateTypeSchema) => {
  const { name, imgUrl } = data;
  const validateFields = billboardCreateSchema.safeParse({
    name,
    imgUrl,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
