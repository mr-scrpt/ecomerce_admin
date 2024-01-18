import { DropzoneInput } from "@/fsd/shared/ui/DropzoneInput/ui/DropzoneInput";
import { Button } from "@/fsd/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/fsd/shared/ui/form";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import {
  UploadFilelFormTypeSchema,
  uploadFileFormSchema,
} from "../../type/schema.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImgList } from "@/fsd/shared/ui/ImgList/ui/ImgList";
import { IFileUploadExtension } from "../../type/extension.type";

interface FileUploaderFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: UploadFilelFormTypeSchema) => void;
  maxFileCoung: number;
  extension: IFileUploadExtension;
  handleImgLoad: (files: FileList) => void;
  handleImgDelete: (path: string) => void;
  imgListLoaded: string[];
}

export const FileUploaderForm: FC<FileUploaderFormProps> = (props) => {
  const {
    onAction,
    handleImgLoad,
    handleImgDelete,
    maxFileCoung,
    extension,
    imgListLoaded,
  } = props;

  const form = useForm<UploadFilelFormTypeSchema>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  return (
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
                  isMultiple={maxFileCoung > 1}
                  extension={extension}
                  handleFileLoad={handleImgLoad}
                  fieldState={fieldState}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              </FormControl>
              {imgListLoaded.length > 0 && (
                <ImgList
                  loadedImgList={imgListLoaded}
                  handleImgDelete={handleImgDelete}
                  className="border"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button type="submit">send</Button>
        </div>
      </form>
    </Form>
  );
};
