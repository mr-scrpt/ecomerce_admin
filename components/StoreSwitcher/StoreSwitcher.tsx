"use client";
import { Store } from "@prisma/client";
import { MinusCircleIcon, PlusCircleIcon, StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState } from "react";

import { ComboboxGroupI } from "@/components/Combobox/type/interface";
import { Combobox } from "@/components/Combobox/ui/combobox";
import { useStoreModal } from "@/hook/use-store-modal";
import {
  getCurrentItem,
  getSerializedData,
} from "../Combobox/lib/serializedData";

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

  const onStoreSelected = (slug: string) => {
    setOpen(true);
    router.push(`/${slug}`);
  };

  const formattedItems = getSerializedData(
    items,
    <StoreIcon />,
    onStoreSelected,
  );

  const currentItem = getCurrentItem(formattedItems, storeCurrent?.slug);

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
