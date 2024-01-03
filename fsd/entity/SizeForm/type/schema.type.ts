import * as z from "zod";

export const sizeFormSchema = z.object({
  name: z.string().min(3).max(200),
  value: z.string().min(1).max(4),
});

export type SizeFormTypeSchema = z.infer<typeof sizeFormSchema>;
