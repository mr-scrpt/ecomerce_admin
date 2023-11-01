import { FC, HTMLAttributes } from "react";
import { ComboboxItem, ComboboxItemI } from "./combobox-item";
import { CommandGroup } from "./command";

interface ComboboxGroupI {
  groupName: string;
  groupItemList: ComboboxItemI[];
}

interface ComboboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  data: ComboboxGroupI[];
  currentItem: ComboboxItemI;
}

export const ComboboxGroup: FC<ComboboxGroupProps> = (props) => {
  const { data, currentItem } = props;
  return (
    <>
      {data.map((item) => (
        <CommandGroup heading={item.groupName}>
          {item.groupItemList &&
            item.groupItemList.map((row) => (
              <ComboboxItem
                data={{
                  name: row.name,
                  isActive: currentItem.name === row.name,
                  icon: row.icon,
                  onSelectItem: row.onSelectItem,
                }}
              />
            ))}
        </CommandGroup>
      ))}
    </>
  );
};
{
  /* <CommandItem */
}
{
  /*   key={row.name} */
}
{
  /*   onSelect={() => row.onSelectItem} */
}
{
  /*   className="gap-x-2 flex hover:cursor-pointer" */
}
{
  /* > */
}
{
  /*   {row.icon && ( */
}
{
  /*     <div className="h-3 w-3 flex items-center">{row.icon}</div> */
}
{
  /*   )} */
}
{
  /*   <div className="text-sm">{row.name}</div> */
}
{
  /*   {currentItem.name && currentItem.name === row.name && ( */
}
{
  /*     <CheckIcon className="ml-auto h-3 w-3" /> */
}
{
  /*   )} */
}
{
  /* </CommandItem> */
}
