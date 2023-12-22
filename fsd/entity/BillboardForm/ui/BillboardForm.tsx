"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { ImgUploader } from "@/fsd/shared/ui/ImgUploader/ui/ImgUploader";
import { Button } from "@/fsd/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/fsd/shared/ui/form";
import { Input } from "@/fsd/shared/ui/input";
import { BillboardFormProps } from "../type/props.type";
import {
  BillboardFormTypeSchema,
  billboardFormSchema,
} from "../type/schema.type";

export const BillboardForm: FC<BillboardFormProps> = (props) => {
  const { onAction, defaultValues, actionName, loading } = props;
  // const { name, imgUrl } = billboard;

  const form = useForm<BillboardFormTypeSchema>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues,
  });

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAction)}>
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard image</FormLabel>
                <FormControl>
                  <ImgUploader
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    handler={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter billboard name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} type="submit">
              {actionName}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
