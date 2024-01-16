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

interface UploaderFileFormProps extends HTMLAttributes<HTMLDivElement> {
  entity: PathUploadEnum;
  name: string;
  isMultiple?: boolean;
}

export const UploaderFileForm: FC<UploaderFileFormProps> = (props) => {
  const { entity, name, isMultiple = false } = props;
  // const [fileList, setFileList] = useState<FileList | null>();

  const router = useRouter();
  const form = useForm<UploadFilelFormTypeSchema>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  const onAction = async (data: UploadFilelFormTypeSchema) => {
    try {
      const { files } = data;
      const formData = new FormData();
      for (let i = 0; i < files!.length; i++) {
        console.log("output_log:  =>>>", files![i]);
        formData.append("fileList", files![i]);
      }
      formData.append("entity", entity);
      formData.append("nameToFile", name);
      //
      const result = await axios.post(`/api/upload`, formData);
      if (result.status === 200) {
        // setFileList(null);
        form.resetField("files");
        // form.reset({ fileList: [] });
        router.refresh();
      }
      console.log("output_log: result =>>>", result);
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
                    accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
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
