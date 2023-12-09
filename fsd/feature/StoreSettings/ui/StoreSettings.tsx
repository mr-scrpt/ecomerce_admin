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

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  StoreSettingTypeSchema,
  storeSettingSchema,
} from "../type/schema.type";
import { useShallow } from "zustand/react/shallow";

interface StoreSettingsProps extends HTMLAttributes<HTMLDivElement> {}

export const StoreSettings = memo((props: StoreSettingsProps) => {
  const { storeCurrent, loading, error } = useStoreData(
    useShallow((state) => ({
      storeCurrent: state.storeCurrent,
      loading: state.loading,
      error: state.error,
    })),
  );
  const params = useParams();
  const router = useRouter();
  // const origin = useOrigin();

  // const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  console.log(" =>>>::::::: setting", storeCurrent?.name);
  // if (!storeCurrent) {
  //   return null;
  // }

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
  }, [storeCurrent]);

  const onSubmit = async (data: any) => {
    // try {
    //   setLoading(true);
    //   await axios.patch(`/api/stores/${params.storeId}`, data);
    //   router.refresh();
    //   toast.success("Store updated.");
    // } catch (error: any) {
    //   toast.error("Something went wrong.");
    // } finally {
    //   setLoading(false);
    // }
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
            <Button disabled={loading} variant="destructive" onClick={() => {}}>
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
});
