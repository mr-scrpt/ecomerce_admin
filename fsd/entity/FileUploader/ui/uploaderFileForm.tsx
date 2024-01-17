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
import { FC, HTMLAttributes, useCallback } from "react";
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

interface UploaderFileFormProps extends HTMLAttributes<HTMLDivElement> {
  entity: PathUploadEnum;
  name: string;
  isMultiple?: boolean;
  extension: Accept;
}

export const UploaderFileForm: FC<UploaderFileFormProps> = (props) => {
  const { entity, name, extension, isMultiple = false } = props;

  const router = useRouter();
  const form = useForm<UploadFilelFormTypeSchema>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  const onAction = async (data: UploadFilelFormTypeSchema) => {
    console.log("output_log:  =>>> SUBMIT");
    try {
      const { files } = data;
      console.log("output_log:  files =>>>", files);
      const formData = new FormData();
      for (let i = 0; i < files!.length; i++) {
        formData.append("fileList", files![i]);
      }
      formData.append("entity", entity);
      formData.append("nameToFile", name);
      //
      const result = await axios.post(`/api/upload`, formData);
      if (result.status === 200) {
        form.resetField("files");
        router.refresh();
      }
    } catch (e) {
      console.log("output_log:  =>>>", e);
    }
  };

  const onDrop = useCallback(
    (files: FileList): void => {
      form.setValue("files", files);
    },
    [form],
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
