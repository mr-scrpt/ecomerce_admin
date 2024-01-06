"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, memo } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/fsd/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/fsd/shared/ui/form";
import { Input } from "@/fsd/shared/ui/input";
import { OptionFormProps } from "../type/props.type";
import { OptionFormTypeSchema, optionFormSchema } from "../type/schema.type";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/fsd/shared/ui/select";
import { selectDataType } from "../../Option";

export const OptionForm: FC<OptionFormProps> = memo((props) => {
  const { onAction, defaultValues, actionName, loading } = props;

  const form = useForm<OptionFormTypeSchema>({
    resolver: zodResolver(optionFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "value",
    control: form.control,
  });

  return (
    <div className="space-x-4 pt-2 pb-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onAction)}
          className="grid grid-cols-3 gap-8"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter option name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="datatype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectDataType.map((item) => (
                        <SelectItem key={item.type} value={item.type}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select data type to this option
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="pt-6 space-x-2 flex items-center justify-end w-full"> */}
            <Button disabled={loading} type="submit">
              {actionName}
            </Button>
            {/* </div> */}
          </div>
          <div className="flex flex-col gap-4 col-span-2">
            {fields.map((item, idx) => {
              return (
                <div key={idx} className="flex gap-4 w-full">
                  <FormField
                    control={form.control}
                    name={`value.${idx}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>Option value name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter option name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name={`value.${idx}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>Option value</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter option name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>

                  {idx > 0 ? (
                    <Button
                      type="button"
                      onClick={() => remove(idx)}
                      className="mb-0 mt-auto"
                      variant="destructive"
                    >
                      <MinusIcon size="10" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      disabled
                      onClick={() => remove(idx)}
                      className="mb-0 mt-auto"
                      variant="destructive"
                    >
                      <MinusIcon size="10" />
                    </Button>
                  )}
                </div>
              );
            })}

            <Button
              type="button"
              onClick={() => append({ name: "", value: "" })}
            >
              <PlusIcon size="15" /> Add option line
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
});

// <FormField
//   control={form.control}
//   name="value"
//   render={({ field }) => (
//     <FormItem className="flex flex-col gap-2">
//       <FormLabel>Values</FormLabel>
//       {fields.map((item, idx) => (
//         <span key={item.id}>
//           <FormControl>
//             <div className="flex flex-row gap-4 items-center">
//               <Input
//                 disabled={loading}
//                 placeholder="Enter value to option..."
//                 {...field.value[idx]}
//               />
//               {/* <Input */}
//               {/*   disabled={loading} */}
//               {/*   placeholder="Enter value to option..." */}
//               {/*   name={item.value} */}
//               {/* /> */}
//               {idx > 0 && (
//                 <Button type="button" onClick={() => remove(idx)}>
//                   <MinusIcon />
//                 </Button>
//               )}
//             </div>
//           </FormControl>
//           <FormMessage />
//         </span>
//       ))}
//       <Button
//         type="button"
//         onClick={() => append({ name: "", value: "" })}
//       >
//         add option line
//       </Button>
//     </FormItem>
//   )}
// />
