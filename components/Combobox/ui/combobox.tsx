"use client";
import { ChevronsUpDownIcon } from "lucide-react";
import { FC } from "react";

import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { ComboboxGroup } from "./combobox-group";
import { ComboboxProps } from "../type/props.type";

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
          onClick={onOpen}
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
