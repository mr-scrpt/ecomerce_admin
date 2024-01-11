import * as z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const categoryFormSchema = z.object({
  name: z.string().min(3).max(200),
  billboardId: z.string().min(5).max(500),
  optionListId: z.array(optionSchema).min(1).optional(),
});

export type CategoryFormTypeSchema = z.infer<typeof categoryFormSchema>;
