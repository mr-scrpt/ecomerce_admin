import { z } from "zod";

export const uploadFileFormSchema = z.object({
  // fileList: z.instanceof(FileList),
  files: z.any(),
  // files: z.instanceof(FileList),
  // fileList: z.object({ FileList: z.any() }),
  // fileList: z.instanceof(FileList),
  // fileList: z.custom<FileList>(
  //   (val) => val instanceof FileList,
  //   "Please upload a file",
  // ),
  // fileList: z.instanceof(File).array(),
});

export type UploadFilelFormTypeSchema = z.infer<typeof uploadFileFormSchema>;
