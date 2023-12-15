"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { billboardAction } from "@/fsd/entity/Billboard";
import { useStoreData } from "@/fsd/entity/Store";
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
import { useShallow } from "zustand/react/shallow";
import { billboardCreateValidate } from "../../model/action/validation.action";
import {
  BillboardCreateTypeSchema,
  billboardCreateSchema,
} from "../../type/schema.type";
import { useRouter } from "next/navigation";
import { ImgUploader } from "@/fsd/shared/ui/ImgUploader/ui/ImgUploader";

interface StoreCreateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccesUrlRedirect?: string | null;
}

export const BillboardCreate: FC<StoreCreateProps> = (props) => {
  const { onSuccesUrlRedirect } = props;
  const [loading, setLoading] = useState(false);

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const form = useForm<BillboardCreateTypeSchema>({
    resolver: zodResolver(billboardCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const route = useRouter();

  const onSubmit = async (form: BillboardCreateTypeSchema) => {
    setLoading(true);
    if (!storeId) {
      return toast.error("Store Not Found");
    }
    const validation = billboardCreateValidate(form);

    console.log(" =>>> validation", validation);
    if (validation?.errors) {
      return toast.error("Incorrect data from the form");
    }
    const { name, imgUrl } = form;
    console.log(" =>>> form", form);
    const { data, error } = await billboardAction.createBillboard({
      name,
      imgUrl,
      storeId,
    });
    if (error) {
      toast.error(error);
    }
    if (data) {
      toast.success(`Store has been created by name ${name}`);

      if (onSuccesUrlRedirect) {
        route.push(onSuccesUrlRedirect);
      }
    }
    setLoading(false);
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
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
