import * as z from "zod";

export const billboardUpdateSchema = z.object({
  name: z.string().min(3).max(200),
  imgUrl: z.string().min(5).max(500),
});

export type BillboardUpdateTypeSchema = z.infer<typeof billboardUpdateSchema>;
