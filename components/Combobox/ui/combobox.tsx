"use client";
import { Dispatch, FC, HTMLAttributes, ReactNode, SetStateAction } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComboboxGroup, ComboboxGroupI } from "./combobox-group";
import { ComboboxItemI } from "./combobox-item";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  data: ComboboxGroupI[];
  currentItem?: ComboboxItemI;
  triggerIcon: ReactNode;
  placeholderSearch: string;
  placeholderEmpty: string;
}

export const Combobox: FC<ComboboxProps> = (props) => {
  const {
    data,
    currentItem,
    isOpen,
    onOpen,
    triggerIcon,
    className,
    placeholderSearch,
    placeholderEmpty,
  } = props;

  return (
    <Popover open={isOpen} onOpenChange={onOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a store"
          className={cn("w-[200px] gap-x-2 justify-between")}
        >
          {triggerIcon && (
            <div className="h-4 w-4 flex items-center">{triggerIcon}</div>
          )}
          {currentItem?.name && <div>{currentItem.name}</div>}
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder={placeholderSearch} />
            <CommandEmpty>{placeholderEmpty}</CommandEmpty>
            {data.map((item) => (
              <ComboboxGroup
                key={item.groupName}
                data={item}
                currentItem={currentItem}
              />
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
