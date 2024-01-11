import * as z from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(3).max(200),
  billboardId: z.string().min(5).max(500),
  optionId: z.string().min(5).max(500),
});

export type CategoryFormTypeSchema = z.infer<typeof categoryFormSchema>;
