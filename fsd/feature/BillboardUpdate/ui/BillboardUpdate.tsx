"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { IBillboard, billboardAction } from "@/fsd/entity/Billboard";
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
import { billboardUpdateValidate } from "../model/action/validation.action";
import {
  BillboardUpdateTypeSchema,
  billboardUpdateSchema,
} from "../type/schema.type";

interface BillboardUpdateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
  billboard: IBillboard;
}

export const BillboardUpdate: FC<BillboardUpdateProps> = (props) => {
  const { onSuccess, storeId, billboard } = props;
  const { name, imgUrl, id } = billboard;
  const [loading, setLoading] = useState(false);

  const form = useForm<BillboardUpdateTypeSchema>({
    resolver: zodResolver(billboardUpdateSchema),
    defaultValues: {
      name,
      imgUrl,
    },
  });

  const onSubmit = async (form: BillboardUpdateTypeSchema) => {
    try {
      setLoading(true);

      if (!storeId) {
        return toast.error("Store Not Found");
      }

      const validation = billboardUpdateValidate(form);

      if (validation?.errors) {
        return toast.error("Incorrect data from the form");
      }

      const { name, imgUrl } = form;
      const { data, error } = await billboardAction.updateBillboard({
        name,
        imgUrl,
        storeId,
        billboardId: id,
      });
      if (error) {
        toast.error(error);
      }
      if (data) {
        toast.success(`Billboard has been created by name ${name}`);
        onSuccess?.();
      }
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
