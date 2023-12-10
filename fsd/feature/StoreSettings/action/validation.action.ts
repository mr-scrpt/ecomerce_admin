import {
  StoreSettingTypeSchema,
  storeSettingSchema,
} from "../type/schema.type";

export const storeSettingsValidate = (data: StoreSettingTypeSchema) => {
  const { name } = data;
  const validateFields = storeSettingSchema.safeParse({
    name,
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
};
