"use client";
import { Form, FormField } from "@/fsd/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useCallback } from "react";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";

import * as z from "zod";
import { Button } from "@/fsd/shared/ui/button";
import { fileUploader } from "../model/action/fileUploader.action";
import { UploadPathEnum } from "../type/uploadPath.enum";

export const billboardFormSchema = z.object({
  fileList: z.instanceof(FileList),
});

export type BillboardFormTypeSchema = z.infer<typeof billboardFormSchema>;
interface uploaderFileFormProps extends HTMLAttributes<HTMLDivElement> {}

export const UploaderFileForm: FC<uploaderFileFormProps> = (props) => {
  const form = useForm<BillboardFormTypeSchema>({
    resolver: zodResolver(billboardFormSchema),
  });

  const onAction = useCallback(async (form: BillboardFormTypeSchema) => {
    try {
      const { fileList } = form;
      await fileUploader({ fileList, pathToUpload: UploadPathEnum.PRODUCTS });
    } catch (e) {
      console.log("output_log:  =>>>", e);
    }
  }, []);

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAction)}>
          <FormField
            control={form.control}
            name="fileList"
            render={({ field: { onChange, onBlur }, fieldState }) => (
              <Dropzone
                noClick
                onDrop={(acceptedFiles) => {
                  form.setValue(
                    "fileList",
                    acceptedFiles as unknown as FileList,
                    {
                      shouldValidate: true,
                    },
                  );
                }}
              >
                {({
                  getRootProps,
                  getInputProps,
                  open,
                  isDragActive,
                  acceptedFiles,
                }) => (
                  <div>
                    <div
                      style={{
                        borderStyle: "dashed",
                        backgroundColor: isDragActive
                          ? `#808080`
                          : "transparent",
                      }}
                      {...getRootProps()}
                    >
                      <input
                        {...getInputProps({
                          id: "spreadsheet",
                          onChange,
                          onBlur,
                        })}
                      />

                      <p>
                        <button type="button" onClick={open}>
                          Choose a file
                        </button>{" "}
                        or drag and drop
                      </p>

                      {acceptedFiles.length
                        ? acceptedFiles[0].name
                        : "No file selected."}

                      <div>
                        {fieldState.error && (
                          <span role="alert">{fieldState.error.message}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
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
