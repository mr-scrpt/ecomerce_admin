"use client";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { FC, HTMLAttributes, useState } from "react";
import { Combobox } from "../ui/combobox";
import { StoreIcon, PlusCircleIcon } from "lucide-react";
import { useStoreModal } from "@/hook/use-store-modal";
import { CommandItem } from "../ui/command";

interface StoreSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  items?: Store[];
}

export const StoreSwitcher: FC<StoreSwitcherProps> = (props) => {
  const { items = [] } = props;
  const { storeSlug } = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();

  const storeCurrent = items.find((item) => item.slug === storeSlug);

  const onStoreSelected = (store: Store) => {
    setOpen(true);
    router.push(`/${store.slug}`);
  };

  const formattedItems = items.map((item) => ({
    name: item.name,
    value: item.slug,
    icon: StoreIcon,
    onSelectItem: onStoreSelected,
  }));

  const formattedData = [
    {
      groupName: "Stores",
      groupItem: [...formattedItems],
    },
    {
      groupName: "Actions",
      groupItem: [
        {
          name: "Create New Store",
          icon: PlusCircleIcon,
        },
      ],
    },
  ];

  const actionRow = (
    <CommandItem
      onSelect={() => {
        setOpen(false);
        storeModal.onOpen();
      }}
      className="flex gap-x-2 hover:cursor-pointer"
    >
      <PlusCircleIcon className="h-4 w-4" />
      Create New Store
    </CommandItem>
  );

  return (
    <Combobox
      isOpen={open}
      onOpen={setOpen}
      onSelectItem={onStoreSelected}
      triggerIcon={<StoreIcon />}
      triggerName={storeCurrent?.name}
      placeholderSearch="Search store..."
      placeholderEmpty="No store found"
      headerGroup="Stores"
      list={formattedItems}
      listItemIcon={<StoreIcon />}
      listItemCurrentName={storeCurrent?.name}
      actionRow={actionRow}
    />
  );
};
