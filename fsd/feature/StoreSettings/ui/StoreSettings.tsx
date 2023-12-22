"use client";
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

import { storeAction } from "@/fsd/entity/Store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { storeSettingsValidate } from "../action/validation.action";
import {
  StoreSettingTypeSchema,
  storeSettingSchema,
} from "../type/schema.type";

interface StoreSettingsProps extends HTMLAttributes<HTMLDivElement> {
  storeName?: string | null;
  loading: boolean;
  onSuccess?: (slug: string) => void;
}

export const StoreSettings: FC<StoreSettingsProps> = memo((props) => {
  const { loading, storeName, onSuccess } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const form = useForm<StoreSettingTypeSchema>({
    resolver: zodResolver(storeSettingSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (storeName) {
      form.reset({ name: storeName });
    }
  }, [form, storeName]);

  const onSubmit = async (form: StoreSettingTypeSchema) => {
    if (storeName) {
      try {
        setIsLoading(true);
        const validation = storeSettingsValidate(form);
        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }
        const { data, error } = await storeAction.renameStore({
          currentStoreName: storeName,
          newStoreName: form.name,
        });

        if (error) {
          toast.error(error);
        }

        if (data) {
          toast.success("Store updated.");
          onSuccess?.(data.slug);
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter new name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-6 space-x-2 flex items-center w-full">
            <Button disabled={isLoading} type="submit">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
});
