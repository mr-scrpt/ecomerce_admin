"use client";
import { CheckIcon } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { IComboboxItem } from "../type/interface";
import { CommandItem } from "@/fsd/shared/ui/command";

interface ComboboxItemProps extends HTMLAttributes<HTMLDivElement> {
  data: IComboboxItem;
}

export const ComboboxItem: FC<ComboboxItemProps> = (props) => {
  const { name, handler, icon, isActive, slug } = props.data;
  console.log(" =>>>", slug);
  return (
    <CommandItem
      onSelect={handler.bind(null, slug)}
      className="gap-x-2 flex hover:cursor-pointer"
    >
      {icon && <div className="h-3 w-3 flex items-center">{icon}</div>}
      <div className="text-sm">{name}</div>
      {isActive && <CheckIcon className="ml-auto h-3 w-3" />}
    </CommandItem>
  );
};