"use client";
import { CommandGroup } from "@/fsd/shared/ui/command";
import { FC } from "react";
import { ComboboxGroupProps } from "../type/props.type";
import { ComboboxItem } from "./ComboboxItem";

export const ComboboxGroup: FC<ComboboxGroupProps> = (props) => {
  const { data, currentItem } = props;
  console.log(" =>>>data", data);
  return (
    <CommandGroup heading={data.groupName}>
      {data.groupItemList &&
        data.groupItemList.map((row) => (
          <ComboboxItem
            key={row.name}
            data={{
              name: row.name,
              value: row.value,
              isActive: currentItem === row.name,
              slug: row.slug,
              icon: row.icon,
              handler: row.handler,
            }}
          />
        ))}
    </CommandGroup>
  );
};
