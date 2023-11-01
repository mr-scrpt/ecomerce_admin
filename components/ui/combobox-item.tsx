import { FC, HTMLAttributes, ReactNode } from "react";
import { CommandItem } from "./command";
import { CheckIcon } from "lucide-react";

export interface ComboboxItemI {
  name: string;
  icon: ReactNode;
  isActive: boolean;
  onSelectItem: () => void;
}

interface ComboboxItemProps extends HTMLAttributes<HTMLDivElement> {
  data: ComboboxItemI;
}

export const ComboboxItem: FC<ComboboxItemProps> = (props) => {
  const { name, onSelectItem, icon, isActive } = props.data;
  return (
    <CommandItem
      onSelect={onSelectItem}
      className="gap-x-2 flex hover:cursor-pointer"
    >
      {icon && <div className="h-3 w-3 flex items-center">{icon}</div>}
      <div className="text-sm">{name}</div>
      {isActive && <CheckIcon className="ml-auto h-3 w-3" />}
    </CommandItem>
  );
};
