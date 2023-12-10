"use client";
import { useStoreData } from "@/fsd/entity/Store/model/store/store.store";
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
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { HTMLAttributes, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import {
  StoreSettingTypeSchema,
  storeSettingSchema,
} from "../type/schema.type";
import { storeSettingsValidate } from "../action/validation.action";

interface StoreSettingsProps extends HTMLAttributes<HTMLDivElement> {}

export const StoreSettings = memo((props: StoreSettingsProps) => {
  const { storeCurrent, loading } = useStoreData(
    useShallow((state) => ({
      storeCurrent: state.storeCurrent,
      loading: state.loading,
      error: state.error,
    })),
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  const router = useRouter();

  const form = useForm<StoreSettingTypeSchema>({
    resolver: zodResolver(storeSettingSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (storeCurrent) {
      form.reset({ name: storeCurrent.name });
    }
  }, [form, storeCurrent]);

  const onSubmit = async (form: StoreSettingTypeSchema) => {
    if (storeCurrent) {
      try {
        setIsLoading(true);
        const validation = storeSettingsValidate(form);
        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }
        const { data, error } = await storeAction.renameStore({
          currentStoreName: storeCurrent?.name,
          newStoreName: form.name,
        });

        if (!data && error) {
          toast.error(error);
        }
        if (data) {
          router.replace(`/${data.slug}${RoutePathEnum.SETTINGS}`);
          toast.success("Store updated.");
        }
      } catch (error: any) {
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // const onDelete = async () => {
  //   try {
  //     setLoading(true);
  //     await axios.delete(`/api/stores/${params.storeId}`);
  //     router.refresh();
  //     router.push("/");
  //     toast.success("Store deleted.");
  //   } catch (error: any) {
  //     toast.error("Make sure you removed all products and categories first.");
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

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
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button
              disabled={isLoading}
              variant="destructive"
              onClick={() => {}}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
});
