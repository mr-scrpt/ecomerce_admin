// export interface IFileManagerPayload {
//   // fileList: File[];
//   fileList: FileList;
//   pathToUpload: UploadPathEnum;
// }
export interface IUploadFileListPayload {
  fileList: File[];
  name: string | null;
  entity: string | null;
}

export interface IUploadFilePayload {
  file: File;
  name: string;
  pathToFolder: string;
}
