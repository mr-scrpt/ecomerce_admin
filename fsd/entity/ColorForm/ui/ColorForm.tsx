"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, memo } from "react";
import { useForm } from "react-hook-form";

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
import { ColorFormProps } from "../type/props.type";
import { ColorFormTypeSchema, colorFormSchema } from "../type/schema.type";

export const ColorForm: FC<ColorFormProps> = memo((props) => {
  const { onAction, defaultValues, actionName, loading } = props;

  const form = useForm<ColorFormTypeSchema>({
    resolver: zodResolver(colorFormSchema),
    defaultValues,
  });

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAction)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter color name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter value to color..."
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
});
