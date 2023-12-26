import * as z from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().min(3).max(200),
  billboardId: z.string().min(5).max(500),
});

export type CategoryCreateTypeSchema = z.infer<typeof categoryCreateSchema>;
