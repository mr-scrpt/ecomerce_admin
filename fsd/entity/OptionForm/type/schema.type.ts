import * as z from "zod";
import { SelectDataTypeEnum } from "../../Option/type/select.enum";

export const optionFormSchema = z.object({
  name: z.string().min(3).max(200),
  datatype: z.nativeEnum(SelectDataTypeEnum),
  // value: z.string().length(6),
  value: z
    .object({
      name: z.string().min(2).max(50),
      value: z.string().min(2).max(50),
    })
    .array(),
});

export type OptionFormTypeSchema = z.infer<typeof optionFormSchema>;
