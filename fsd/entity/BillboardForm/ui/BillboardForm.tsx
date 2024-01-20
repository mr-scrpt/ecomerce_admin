"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, memo, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ImgList } from "@/fsd/shared/ui/ImgList/ui/ImgList";
import { Button } from "@/fsd/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/fsd/shared/ui/form";
import { Input } from "@/fsd/shared/ui/input";
import { Image as ImgIcon } from "lucide-react";
import { BillboardFormProps } from "../type/props.type";
import {
  BillboardFormTypeSchema,
  billboardFormSchema,
} from "../type/schema.type";

export const BillboardForm: FC<BillboardFormProps> = memo((props) => {
  const {
    onAction,
    handleOpenButton,
    onChangeName,
    defaultValues,
    actionName,
    loading,
    imgListLoaded,
    disabledUploadeMoadlButton,
  } = props;
  // const [imgListLoaded, setImgListLoaded] = useState<string[]>();

  const form = useForm<BillboardFormTypeSchema>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAction)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Enter billboard name..."
                    onChange={(e) => {
                      onChangeName(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard image</FormLabel>
                {disabledUploadeMoadlButton && (
                  <FormDescription className="text-red-500">
                    Before load img, enter name
                  </FormDescription>
                )}
                <FormControl>
                  <Button
                    type="button"
                    className="flex gap-1"
                    disabled={disabledUploadeMoadlButton}
                    onClick={handleOpenButton}
                  >
                    <ImgIcon />
                    Upload img
                  </Button>
                  {/* <ImgUploader */}
                  {/*   value={field.value ? [field.value] : []} */}
                  {/*   disabled={loading} */}
                  {/*   handler={field.onChange} */}
                  {/* /> */}
                </FormControl>

                {imgListLoaded && imgListLoaded.length > 0 && (
                  <ImgList loadedImgList={imgListLoaded} className="border" />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField */}
          {/*   control={form.control} */}
          {/*   name="imgUrl" */}
          {/*   render={({ field }) => ( */}
          {/*     <FormItem> */}
          {/*       <FormLabel>Billboard image</FormLabel> */}
          {/*       <FormControl> */}
          {/*         <ImgUploader */}
          {/*           value={field.value ? [field.value] : []} */}
          {/*           disabled={loading} */}
          {/*           handler={field.onChange} */}
          {/*         /> */}
          {/*       </FormControl> */}
          {/*       <FormMessage /> */}
          {/*     </FormItem> */}
          {/*   )} */}
          {/* /> */}
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} type="submit">
              {actionName}
            </Button>
          </div>
        </form>
      </Form>
      {/* <FileUploader */}
      {/*   entity={PathUploadEnum.BILLBOARD} */}
      {/*   nameToFile={form.getValues("name")} */}
      {/*   onFileLoaded={(fileList) => { */}
      {/*     console.log("output_log: field name =>>>", form.getValues("name")); */}
      {/*     console.log("output_log: onLoadFileList =>>>", fileList); */}
      {/*     form.setValue("imgUrl", fileList); */}
      {/*     setImgListLoaded(fileList); */}
      {/*   }} */}
      {/* /> */}
    </div>
  );
});
