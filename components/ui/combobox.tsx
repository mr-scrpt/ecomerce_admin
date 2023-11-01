"use client";
import { Dispatch, FC, HTMLAttributes, ReactNode, SetStateAction } from "react";
import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";

interface ListItemI {
  name: string;
  value: string;
}
interface ComboboxProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  onSelectItem: (item: any) => void;
  triggerIcon?: ReactNode;
  classButton?: string;
  triggerName?: string;
  placeholderSearch: string;
  placeholderEmpty: string;
  headerGroup: string;
  list: ListItemI[];
  listItemIcon?: ReactNode;
  listItemCurrentName?: string;
  actionRow?: ReactNode;
}

export const Combobox: FC<ComboboxProps> = (props) => {
  const {
    isOpen,
    onOpen,
    onSelectItem,
    triggerIcon,
    classButton,
    triggerName,
    placeholderSearch,
    placeholderEmpty,
    headerGroup,
    list,
    listItemIcon,
    listItemCurrentName,
    actionRow,
  } = props;

  console.log("list", list);
  return (
    <Popover open={isOpen} onOpenChange={onOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a store"
          className={cn("w-[200px] gap-x-2 justify-between", classButton)}
        >
          {triggerIcon && (
            <div className="h-4 w-4 flex items-center">{triggerIcon}</div>
          )}
          {triggerName && <div>{triggerName}</div>}
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder={placeholderSearch} />
            <CommandEmpty>{placeholderEmpty}</CommandEmpty>
            <CommandGroup heading={headerGroup}>
              {list &&
                list.map((item) => (
                  <CommandItem
                    key={item.name}
                    onSelect={() => onSelectItem}
                    className="gap-x-2 flex hover:cursor-pointer"
                  >
                    {listItemIcon && (
                      <div className="h-3 w-3 flex items-center">
                        {listItemIcon}
                      </div>
                    )}
                    <div className="text-sm">{item.name}</div>
                    {listItemCurrentName &&
                      listItemCurrentName === item.name && (
                        <CheckIcon className="ml-auto h-3 w-3" />
                      )}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
          {actionRow && (
            <>
              <CommandSeparator />
              <CommandList>
                <CommandGroup heading="Actions">{actionRow}</CommandGroup>
              </CommandList>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
