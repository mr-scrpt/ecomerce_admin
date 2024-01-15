import { UploadPathEnum } from "./uploadPath.enum";

export interface IUploaderFilePayload {
  fileList: FileList;
  pathToUpload: UploadPathEnum;
}
