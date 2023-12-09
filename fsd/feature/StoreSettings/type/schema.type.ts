import * as z from "zod";

export const storeSettingSchema = z.object({
  name: z.string().min(3),
});

export type StoreSettingTypeSchema = z.infer<typeof storeSettingSchema>;
