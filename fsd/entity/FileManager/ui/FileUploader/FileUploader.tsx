"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useStoreData } from "@/fsd/entity/Store";
import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";
import { AxiosResponseType } from "@/fsd/shared/type/axiosResponse.interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import {
  getFileListPublicRelative,
  getFileName,
  moveFolderPrepare,
  removeFilePrepare,
} from "../../model/action/fileManager.action";
import { API_UPLOAD_ENDPOINT } from "../../type/api.const";
import {
  FILE_IMG_UPLOAD,
  FILE_MANAGER_DEFAULT_ERROR_MESSAGE,
  FILE_MANAGER_DEFAULT_LOAD_FILE_COUNT,
} from "../../type/fileManager.const";
import { FormDataUploadEnum } from "../../type/formData.const";
import {
  UploadFilelFormTypeSchema,
  uploadFileFormSchema,
} from "../../type/schema.type";
import { ILoadFileList } from "../../type/ui.type";
import { FileUploaderForm } from "./FileUploaderForm";

interface UploaderFileFormProps extends HTMLAttributes<HTMLDivElement> {
  entity: PathUploadEnum;
  nameToFile: string;
  isMultiple?: boolean;
  setFileLoaded: (fileList: string[]) => void;
  onClickSendButton: () => void;
}

export const FileUploader: FC<UploaderFileFormProps> = (props) => {
  const { entity, nameToFile, setFileLoaded, onClickSendButton } = props;

  const [imgListLoaded, setImgListLoaded] = useState<string[]>([]);
  const [fileList, setFileList] = useState<FileList>();

  const router = useRouter();

  const form = useForm<UploadFilelFormTypeSchema>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  const { slug: slugToStore } = useStoreData(
    useShallow((state) => ({ slug: state.storeCurrent?.slug })),
  );

  const loadFileList = useCallback(
    async (data: ILoadFileList): Promise<string[]> => {
      try {
        const { files, entity, nameToFile, slugToStore } = data;
        console.log("output_log:  =>>>", entity, nameToFile, slugToStore);
        const formData = new FormData();

        for (let i = 0; i < files!.length; i++) {
          formData.append(FormDataUploadEnum.LIST, files![i]);
        }

        formData.append(FormDataUploadEnum.ENTITY, entity);
        formData.append(FormDataUploadEnum.NAME, nameToFile);

        formData.append(FormDataUploadEnum.STORE, slugToStore);

        const { data: response }: AxiosResponseType<string[]> =
          await axios.post(API_UPLOAD_ENDPOINT, formData);

        const { data: apiData, error, status } = response;

        if (error) {
          toast.error(error);
        }

        return apiData;
      } catch (e) {
        toast.error(FILE_MANAGER_DEFAULT_ERROR_MESSAGE);
        return [];
      }
    },
    [],
  );

  const handleImgLoad = useCallback(
    async (files: FileList): Promise<void> => {
      // setFileList(files);

      const imgListPath = await loadFileList({
        files,
        entity,
        nameToFile,
        slugToStore: slugToStore ?? "",
      });

      setImgListLoaded(imgListPath);
    },
    [slugToStore, nameToFile, loadFileList, entity],
  );

  const handleImgDelete = useCallback(
    async (item: string) => {
      try {
        const fileName = getFileName(item);
        const updatedImgList = imgListLoaded.filter((path) => path !== item);
        const { error } = await removeFilePrepare(item, false);

        if (error) {
          toast.error(error);
          return;
        }

        toast.success(`File ${fileName} removed from upload list`);
        setImgListLoaded(updatedImgList);
      } catch (e) {
        toast.error(FILE_MANAGER_DEFAULT_ERROR_MESSAGE);
      }
    },
    [imgListLoaded],
  );

  const onAction = async () => {
    try {
      const { data, error } = await moveFolderPrepare(
        { folderName: nameToFile, entity, storeSlug: slugToStore ?? null },
        false,
      );
      if (error) {
        toast.error(error);
        return;
      }

      const { data: fileList, error: fileListError } =
        await getFileListPublicRelative(data!);

      if (fileListError) {
        toast.error(fileListError);
        return;
      }
      setFileLoaded(fileList!);
      setImgListLoaded([]);
      console.log("output_log:  =>>> file list", fileList);
      onClickSendButton();
    } catch (e) {}
  };

  return (
    <div className="space-x-4 pt-2 pb-4">
      <FileUploaderForm
        onAction={onAction}
        handleImgDelete={handleImgDelete}
        handleImgLoad={handleImgLoad}
        maxFileCoung={FILE_MANAGER_DEFAULT_LOAD_FILE_COUNT}
        extension={FILE_IMG_UPLOAD}
        imgListLoaded={imgListLoaded}
      />
    </div>
  );
};
