"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/fsd/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";
import { DropzoneInput } from "@/fsd/shared/ui/DropzoneInput/ui/DropzoneInput";
import { ImgList } from "@/fsd/shared/ui/ImgList/ui/ImgList";
import { Button } from "@/fsd/shared/ui/button";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Accept } from "react-dropzone";
import toast from "react-hot-toast";
import {
  UploadFilelFormTypeSchema,
  uploadFileFormSchema,
} from "../../type/schema.type";
import { FileUploaderForm } from "./FileUploaderForm";
import { AxiosResponseType } from "@/fsd/shared/type/axiosResponse.interface";
import { API_UPLOAD_ENDPOINT } from "../../type/api.const";
import { FormDataUploadEnum } from "../../type/formData.const";
import { useStoreData } from "@/fsd/entity/Store";
import { useShallow } from "zustand/react/shallow";
import { ILoadFileList } from "../../type/ui.type";
import {
  FILE_IMG_UPLOAD,
  FILE_MANAGER_DEFAULT_ERROR_MESSAGE,
  FILE_MANAGER_DEFAULT_LOAD_FILE_COUNT,
} from "../../type/fileManager.const";
import { removeFilePrepare } from "../../model/action/fileManager.action";

interface UploaderFileFormProps extends HTMLAttributes<HTMLDivElement> {
  entity: PathUploadEnum;
  nameToFile: string;
  isMultiple?: boolean;
}

export const FileUploader: FC<UploaderFileFormProps> = (props) => {
  const [imgListLoaded, setImgListLoaded] = useState<string[]>([]);
  const [fileList, setFileList] = useState<FileList>();
  const { entity, nameToFile } = props;

  const router = useRouter();

  const form = useForm<UploadFilelFormTypeSchema>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  const { name: nameToStore } = useStoreData(
    useShallow((state) => ({ name: state.storeCurrent?.name })),
  );

  const loadFileList = useCallback(
    async (data: ILoadFileList): Promise<string[]> => {
      try {
        const { files, entity, nameToFile, nameToStore } = data;
        const formData = new FormData();

        for (let i = 0; i < files!.length; i++) {
          formData.append(FormDataUploadEnum.LIST, files![i]);
        }

        formData.append(FormDataUploadEnum.ENTITY, entity);
        formData.append(FormDataUploadEnum.NAME, nameToFile);

        formData.append(FormDataUploadEnum.STORE, nameToStore);

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

  // TODO: Возможно понадобиться как обвертка которая еще будет получать имя
  const onAction = async (data: UploadFilelFormTypeSchema) => {
    try {
      // if (imgListLoaded) {
      //   await axios.post("/api/move", { folder: name, entity });
      // }
    } catch (e) {}
  };

  // const onUpload = useCallback(async (files: FileList): Promise<void> => {
  //   setFileList(files);
  //   const imgListPath = await loadFileList(files, PathUploadEnum.TMP, name);
  //   form.setValue("files", files);
  //   setImgListLoaded(imgListPath);
  // }, []);

  const handleImgLoad = useCallback(
    async (files: FileList): Promise<void> => {
      setFileList(files);

      const imgListPath = await loadFileList({
        files,
        entity,
        nameToFile,
        nameToStore: nameToStore ?? "",
      });

      setImgListLoaded(imgListPath);
    },
    [nameToStore, nameToFile, loadFileList, entity],
  );

  // TODO: сделать через сервеный экшен
  const handleImgDelete = useCallback(
    async (item: string) => {
      try {
        // const formData = new FormData();
        // formData.append("item", item);
        // const result = await axios.post(`/api/remove`, formData);
        // console.log("output_log:  =>>>", result);

        const fileName = item.split("/").pop();
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
