"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/fsd/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";
import { Button } from "@/fsd/shared/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  UploadFilelFormTypeSchema,
  uploadFileFormSchema,
} from "../type/schema.type";
import { DropzoneInput } from "@/fsd/shared/ui/DropzoneInput/DropzoneInput";
import { Accept } from "react-dropzone";
import toast from "react-hot-toast";

interface UploaderFileFormProps extends HTMLAttributes<HTMLDivElement> {
  entity: PathUploadEnum;
  name: string;
  isMultiple?: boolean;
  extension: Accept;
}

interface AxiosResponse<T> {
  response: T;
}

export const UploaderFileForm: FC<UploaderFileFormProps> = (props) => {
  const [loadedImgList, setLoadedImgList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<FileList>();
  const { entity, name, extension, isMultiple = false } = props;

  const router = useRouter();
  const form = useForm<UploadFilelFormTypeSchema>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  const loadFileList = useCallback(
    async (
      files: FileList,
      entity: PathUploadEnum,
      name: string,
    ): Promise<string[]> => {
      try {
        const formData = new FormData();
        for (let i = 0; i < files!.length; i++) {
          formData.append("fileList", files![i]);
        }
        formData.append("entity", entity);
        formData.append("nameToFile", name);
        //
        const { data, status } = await axios.post<AxiosResponse<string[]>>(
          `/api/upload`,
          formData,
        );
        // console.log("output_log:  response =>>>", data.response);

        if (status === 200) {
          form.resetField("files");
          router.refresh();
        }

        return data.response;
      } catch (e) {
        console.log("output_log:  =>>>", e);
        return [];
      }
    },
    [form, router],
  );

  const onAction = async (data: UploadFilelFormTypeSchema) => {
    try {
      if (loadedImgList) {
        await axios.post("/api/move", { folder: name, entity });
      }
    } catch (e) {}
    // try {
    //   const { files } = data;
    //   const formData = new FormData();
    //   for (let i = 0; i < files!.length; i++) {
    //     formData.append("fileList", files![i]);
    //   }
    //   formData.append("entity", entity);
    //   formData.append("nameToFile", name);
    //   //
    //   const result = await axios.post(`/api/upload`, formData);
    //   if (result.status === 200) {
    //     form.resetField("files");
    //     router.refresh();
    //   }
    // } catch (e) {
    //   console.log("output_log:  =>>>", e);
    // }
  };

  const onUpload = useCallback(async (files: FileList): Promise<void> => {
    setFileList(files);
    const imgListPath = await loadFileList(files, PathUploadEnum.TMP, name);
    form.setValue("files", files);
    setLoadedImgList(imgListPath);
  }, []);

  const onDrop = useCallback(
    async (files: FileList): Promise<void> => {
      setFileList(files);

      const imgListPath = await loadFileList(files, PathUploadEnum.TMP, name);
      console.log("output_log: imgListPath =>>>", imgListPath);
      // form.setValue("files", files);
      setLoadedImgList(imgListPath);
    },
    [name, loadFileList],
  );

  const onDeleteFile = useCallback(
    async (item: string) => {
      try {
        const formData = new FormData();
        formData.append("item", item);
        const result = await axios.post(`/api/remove`, formData);
        console.log("output_log:  =>>>", result);
        const fileName = item.split("/").pop();
        const updatedImgList = loadedImgList.filter((path) => path !== item);
        setLoadedImgList(updatedImgList);
        toast.success(`File ${fileName} removed from upload list`);
      } catch (e) {
        console.log("output_log:  error e =>>>", e);
      }
    },
    [loadedImgList],
  );

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAction)}>
          <FormField
            control={form.control}
            name="files"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Upload file</FormLabel>
                <FormControl>
                  <DropzoneInput
                    isMultiple={isMultiple}
                    extension={extension}
                    onDrop={onDrop}
                    fieldState={fieldState}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    loadedImgList={loadedImgList}
                    onDelete={onDeleteFile}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button type="submit">send</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
