"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, memo, useEffect } from "react";
import { useForm } from "react-hook-form";

import MultipleSelector from "@/fsd/shared/ui/MultipleSelector/MultipleSelector";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/fsd/shared/ui/select";
import { CategoryFormProps } from "../type/props.type";
import {
  CategoryFormTypeSchema,
  categoryFormSchema,
} from "../type/schema.type";

export const CategoryForm: FC<CategoryFormProps> = memo((props) => {
  const {
    onAction,
    defaultValues,
    actionName,
    billboardList,
    optionList,
    loading,
  } = props;

  const form = useForm<CategoryFormTypeSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, optionList, form]);

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onAction)}
          className="grid grid-cols-3 gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter category name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billboardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a billboard"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {billboardList.map((billboard) => (
                      <SelectItem key={billboard.value} value={billboard.value}>
                        {billboard.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="optionList"
            render={({ field }) => {
              console.log("field***** =>>>", field);
              return (
                <FormItem>
                  <FormLabel>Option</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      options={optionList}
                      placeholder="Select option to category"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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
