import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";

export interface ILoadFileList {
  files: FileList;
  entity: PathUploadEnum;
  nameToFile: string;
  nameToStore: string;
}
