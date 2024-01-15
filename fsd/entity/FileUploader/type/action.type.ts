import { UploadPathEnum } from "./uploadPath.enum";

export interface IUploaderFilePayload {
  // fileList: File[];
  fileList: FileList;
  pathToUpload: UploadPathEnum;
}
