import {
  FILE_NAME_LENGTH_MAX,
  FILE_NAME_LENGTH_MIN,
} from "@/fsd/shared/type/global.const";
import * as z from "zod";

export const billboardFormSchema = z.object({
  name: z.string().min(FILE_NAME_LENGTH_MIN).max(FILE_NAME_LENGTH_MAX),
  imgUrl: z.string().array().max(1),
});

export type BillboardFormTypeSchema = z.infer<typeof billboardFormSchema>;
