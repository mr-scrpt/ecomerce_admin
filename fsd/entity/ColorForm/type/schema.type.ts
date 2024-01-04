import * as z from "zod";

export const colorFormSchema = z.object({
  name: z.string().min(3).max(200),
  value: z.string().min(1).max(4),
});

export type ColorFormTypeSchema = z.infer<typeof colorFormSchema>;
