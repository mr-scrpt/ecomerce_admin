import { z } from "zod";

export const uploadFileFormSchema = z.object({
  // fileList: z.instanceof(FileList),
  fileList: z.any(),
  // fileList: z.instanceof(FileList),
  // fileList: z.instanceof(File).array(),
});

export type UploadFilelFormTypeSchema = z.infer<typeof uploadFileFormSchema>;
