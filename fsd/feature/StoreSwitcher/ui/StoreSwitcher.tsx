"use client";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { Combobox } from "@/fsd/shared/ui/Combobox";
import { MinusIcon, PlusCircleIcon, StoreIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { buildStoreSwitcherUI } from "../lib/util";
import { useStoreSwitcherData } from "../model/store/storeSwitcher.store";
import { StoreSwitcherHandlerEnum } from "../type/handler.enum";
import { StoreSwitcherIconEnum } from "../type/icon.enum";
import { StoreSwitcherProps } from "../type/props.type";
import { IHandlerCollection, IIconCollection } from "../type/type";
import { useRouter } from "next/navigation";
import { useStoreModal } from "@/fsd/shared/hook/use-store-modal";

export const StoreSwitcher: FC<StoreSwitcherProps> = () => {
  const { storeSlug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useStoreModal();
  const router = useRouter();

  const { fetchStoreByUserIdAndCreateList, list, current } =
    useStoreSwitcherData();
  const { userId } = useUserData();
  useEffect(() => {
    if (userId && storeSlug) {
      fetchStoreByUserIdAndCreateList(userId, storeSlug as string);
    }
  }, [userId, storeSlug]);

  const iconCollection: IIconCollection = {
    [StoreSwitcherIconEnum.STORE]: <StoreIcon />,
    [StoreSwitcherIconEnum.CREATE]: <PlusCircleIcon />,
    [StoreSwitcherIconEnum.REMOVE]: <MinusIcon />,
  };

  const onStoreSelected = (slug: string) => {
    setIsOpen(false);
    router.push(`/${slug}`);
  };
  const handlerCollection: IHandlerCollection = {
    [StoreSwitcherHandlerEnum.SELECT]: onStoreSelected,
    [StoreSwitcherHandlerEnum.CREATE]: onOpen,
    [StoreSwitcherHandlerEnum.REMOVE]: console.log,
  };

  const listItem = buildStoreSwitcherUI(
    list,
    iconCollection,
    handlerCollection,
  );

  return (
    <Combobox
      isOpen={isOpen}
      onOpen={() => setIsOpen(!isOpen)}
      data={listItem}
      currentItem={current?.name}
      triggerIcon={<StoreIcon />}
      placeholderSearch="Search store..."
      placeholderEmpty="No store found"
    />
  );
};
