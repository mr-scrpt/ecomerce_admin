// export interface IFileManagerPayload {
//   // fileList: File[];
//   fileList: FileList;
//   pathToUpload: UploadPathEnum;
// }
export interface IFileRemoveListPayload {
  fileList: File[];
  fileName: string | null;
  storeSlug: string | null;
  entity: string | null;
}

export interface IFileUploadPayload {
  file: File;
  name: string;
  pathToFolder: string;
}

export interface IFileMovePayload {
  folderName: string;
  entity: string;
  storeSlug: string | null;
}
