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
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/fsd/shared/ui/button";
import { Input } from "@/fsd/shared/ui/input";
import {
  UploadFilelFormTypeSchema,
  uploadFileFormSchema,
} from "../type/schema.type";
import axios from "axios";
import { BILLBOARD_PATH } from "../../Billboard";

interface UploaderFileFormProps extends HTMLAttributes<HTMLDivElement> {
  // entity:
}

export const UploaderFileForm: FC<UploaderFileFormProps> = (props) => {
  const [fileList, setFileList] = useState<FileList | null>();
  const onAction = async (form: UploadFilelFormTypeSchema) => {
    try {
      const formData = new FormData();

      for (let i = 0; i < fileList!.length; i++) {
        formData.append("fileList", fileList![i]);
      }

      formData.append("entity", BILLBOARD_PATH);
      formData.append("nameToFile", "my_new_file");

      await axios.post(`/api/upload`, formData);
    } catch (e) {
      console.log("output_log:  =>>>", e);
    }
  };

  const form = useForm<UploadFilelFormTypeSchema>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAction)}>
          <FormField
            control={form.control}
            name="fileList"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>IMG</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    onChange={(event) => {
                      console.log(
                        "output_log:  =>>> change",
                        event.target.files,
                      );
                      setFileList(event.target.files);
                    }}
                    {...field}
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
