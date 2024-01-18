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
