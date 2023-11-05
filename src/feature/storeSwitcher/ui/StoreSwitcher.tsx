"use client";
import { useParams, useRouter } from "next/navigation";
import { FC, HTMLAttributes, useEffect, useState } from "react";

import { ComboboxGroupI } from "@/components/Combobox/type/interface";
import { Combobox } from "@/components/Combobox/ui/combobox";
import { useStoreModal } from "@/hook/use-store-modal";
import { useStoreListStore } from "@/src/entity/Store/model/store";
import axios from "axios";
import { Store } from "@prisma/client";
import {
  getCurrentItem,
  getSerializedData,
} from "@/components/Combobox/lib/serializedData";
import { MinusCircleIcon, PlusCircleIcon, StoreIcon } from "lucide-react";

interface StoreSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  items: Store[];
}

export const StoreSwitcher: FC<StoreSwitcherProps> = (props) => {
  const items = props.items;
  const { storeSlug } = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  //
  const storeCurrent = items.find((item) => item.slug === storeSlug);

  console.log("items ==== ", items);
  console.log("slug", storeSlug);
  //
  const onStoreSelected = (slug: string) => {
    setOpen(false);
    router.push(`/${slug}`);
  };
  //
  const formattedItems = getSerializedData(
    items,
    <StoreIcon />,
    onStoreSelected,
    storeSlug as string,
  );
  //
  const currentItem = getCurrentItem(formattedItems, storeCurrent?.slug);
  //
  const formattedData: ComboboxGroupI[] = [
    {
      groupName: "Stores",
      groupItemList: [...formattedItems],
    },
    {
      groupName: "Actions",
      groupItemList: [
        {
          name: "Create New Store",
          icon: <PlusCircleIcon />,
          isActive: false,
          value: "",
          onSelectItem: () => {
            setOpen(false);
            storeModal.onOpen();
          },
        },
        {
          name: "Remove Current Store",
          icon: <MinusCircleIcon />,
          isActive: false,
          value: "",
          onSelectItem: (elem) => {
            console.log(elem);
          },
        },
      ],
    },
  ];
  return (
    <Combobox
      isOpen={open}
      onOpen={() => setOpen(!open)}
      data={formattedData}
      currentItem={currentItem}
      triggerIcon={<StoreIcon />}
      placeholderSearch="Search store..."
      placeholderEmpty="No store found"
    />
  );
};
