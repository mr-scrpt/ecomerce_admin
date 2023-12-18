import * as z from "zod";

export const billboardCreateSchema = z.object({
  name: z.string().min(3).max(200),
  imgUrl: z.string().min(5).max(500),
});

export type BillboardCreateTypeSchema = z.infer<typeof billboardCreateSchema>;
