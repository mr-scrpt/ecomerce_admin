"use client";

import { FC, HTMLAttributes, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "@/hook/use-store-modal";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";

interface StoreModalCreateProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  name: z.string().min(3),
});

type typeSchema = z.infer<typeof formSchema>;

export const StoreModalCreate: FC<StoreModalCreateProps> = (props) => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<typeSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmite = async (values: typeSchema) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/store", values);
      const { slug, name } = response.data;
      toast.success(`Store has been created by name ${name}`);

      window.location.assign(`/${slug}`);
    } catch (e) {
      const { response } = e as AxiosError;
      toast.error((response?.data as string) || "Something whent wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Sotore"
      description="Add new store to manage products and catigories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-x-4 pt-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmite)}>
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
                variant="destructive"
                onClick={onClose}
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
    </Modal>
  );
};
