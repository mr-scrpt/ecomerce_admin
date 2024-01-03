import {
  BillboardFormTypeSchema,
  billboardFormSchema,
} from "@/fsd/entity/BillboardForm";

export const billboardUpdateValidate = (data: BillboardFormTypeSchema) => {
  const { name, imgUrl } = data;
  const validateFields = billboardFormSchema.safeParse({
    name,
    imgUrl,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
