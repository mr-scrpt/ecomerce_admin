import * as z from "zod";

export const storeCreateSchema = z.object({
  name: z.string().min(3),
});

export type StoreCreateTypeSchema = z.infer<typeof storeCreateSchema>;
