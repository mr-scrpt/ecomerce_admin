"use client";
import { MinusCircleIcon, PlusCircleIcon, StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, HTMLAttributes, useEffect, useState } from "react";

import { ComboboxGroupI } from "@/components/Combobox/type/interface";
import { Combobox } from "@/components/Combobox/ui/combobox";
import { useStoreModal } from "@/hook/use-store-modal";
import {
  getCurrentItem,
  getSerializedData,
} from "../Combobox/lib/serializedData";
import { useStoreListStore } from "@/src/entity/Store/model/store";
import axios from "axios";

interface StoreSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  // items?: Store[];
  // userId: string;
}

export const StoreSwitcher: FC<StoreSwitcherProps> = (props) => {
  const items = useStoreListStore((state) => state.data);
  const loading = useStoreListStore((state) => state.loading);
  const fetchStoreList = useStoreListStore((state) => state.fetchStore);
  const { storeSlug } = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  //
  const storeCurrent = items.find((item) => item.slug === storeSlug);

  useEffect(() => {
    // console.log("fetching", storeSlug);
    // const res = await axios.get("/api/store");
    fetchStoreList();
  }, []);

  console.log("items", items);
  //
  // const onStoreSelected = (slug: string) => {
  //   setOpen(false);
  //   router.push(`/${slug}`);
  // };
  //
  // const formattedItems = getSerializedData(
  //   items,
  //   <StoreIcon />,
  //   onStoreSelected,
  //   storeSlug as string,
  // );
  //
  // const currentItem = getCurrentItem(formattedItems, storeCurrent?.slug);
  //
  // const formattedData: ComboboxGroupI[] = [
  //   {
  //     groupName: "Stores",
  //     groupItemList: [...formattedItems],
  //   },
  //   {
  //     groupName: "Actions",
  //     groupItemList: [
  //       {
  //         name: "Create New Store",
  //         icon: <PlusCircleIcon />,
  //         isActive: false,
  //         value: "",
  //         onSelectItem: () => {
  //           setOpen(false);
  //           storeModal.onOpen();
  //         },
  //       },
  //       {
  //         name: "Remove Current Store",
  //         icon: <MinusCircleIcon />,
  //         isActive: false,
  //         value: "",
  //         onSelectItem: (elem) => {
  //           console.log(elem);
  //         },
  //       },
  //     ],
  //   },
  // ];
  //
  // return (
  //   <Combobox
  //     isOpen={open}
  //     onOpen={() => setOpen(!open)}
  //     data={formattedData}
  //     currentItem={currentItem}
  //     triggerIcon={<StoreIcon />}
  //     placeholderSearch="Search store..."
  //     placeholderEmpty="No store found"
  //     active
  //   />
  // );
  return null;
};
