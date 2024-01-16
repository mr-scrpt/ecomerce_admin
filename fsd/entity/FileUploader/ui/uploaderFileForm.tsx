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
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";

import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";
import { Button } from "@/fsd/shared/ui/button";
import { Input } from "@/fsd/shared/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  UploadFilelFormTypeSchema,
  uploadFileFormSchema,
} from "../type/schema.type";
import { FileUploadEnum } from "..";
import { FILE_IMG_UPLOAD_EXTENSION } from "../type/fileUploadExtension.const";

interface UploaderFileFormProps extends HTMLAttributes<HTMLDivElement> {
  entity: PathUploadEnum;
  name: string;
  isMultiple?: boolean;
  extension: FileUploadEnum;
}

export const UploaderFileForm: FC<UploaderFileFormProps> = (props) => {
  const { entity, name, extension, isMultiple = false } = props;

  const router = useRouter();
  const form = useForm<UploadFilelFormTypeSchema>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  const onAction = async (data: UploadFilelFormTypeSchema) => {
    try {
      const { files } = data;
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

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAction)}>
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Photo</FormLabel>
                <FormControl>
                  <Input
                    accept={extension}
                    type="file"
                    multiple={isMultiple}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files : null)
                    }
                  />
                </FormControl>
                <FormDescription>
                  If you do not select a photo one will be generated.
                </FormDescription>
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
