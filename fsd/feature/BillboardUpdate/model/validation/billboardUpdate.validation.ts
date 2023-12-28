import {
  BillboardUpdateTypeSchema,
  billboardUpdateSchema,
} from "../../type/schema.type";

export const billboardUpdateValidate = (data: BillboardUpdateTypeSchema) => {
  const { name, imgUrl } = data;
  const validateFields = billboardUpdateSchema.safeParse({
    name,
    imgUrl,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
