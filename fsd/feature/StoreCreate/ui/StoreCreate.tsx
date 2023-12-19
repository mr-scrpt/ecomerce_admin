"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { storeAction } from "@/fsd/entity/Store";
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
import { storeCreateValidate } from "../model/action/validation.action";
import { StoreCreateTypeSchema, storeCreateSchema } from "../type/schema.type";

interface StoreCreateProps extends HTMLAttributes<HTMLDivElement> {
  onCancel: () => void;
  onSuccess?: (path: string) => void;
}

export const StoreCreate: FC<StoreCreateProps> = (props) => {
  const { onCancel, onSuccess } = props;
  const [loading, setLoading] = useState(false);

  const form = useForm<StoreCreateTypeSchema>({
    resolver: zodResolver(storeCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (form: StoreCreateTypeSchema) => {
    setLoading(true);
    const validation = storeCreateValidate(form);
    if (validation?.errors) {
      return toast.error("Incorrect data from the form");
    }
    const { data, error } = await storeAction.createStore(form.name);
    if (error) {
      toast.error(error);
    }
    if (data) {
      const { slug } = data;
      console.log(" =>>> func", onSuccess);
      onSuccess?.(`/${slug}`);
      toast.success(`Store has been created by name ${name}`);

      // window.location.assign(`/${data.slug}`);
    }
    setLoading(false);
  };

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter new name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button
              disabled={loading}
              type="button"
              variant="destructive"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
