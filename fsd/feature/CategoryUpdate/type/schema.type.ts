import * as z from "zod";

export const categoryUpdateSchema = z.object({
  name: z.string().min(3).max(200),
  billboardId: z.string().min(5).max(500),
});

export type CategoryUpdateTypeSchema = z.infer<typeof categoryUpdateSchema>;
