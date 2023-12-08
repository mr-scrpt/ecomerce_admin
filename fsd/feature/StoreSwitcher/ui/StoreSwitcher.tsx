"use client";
import { useUserData } from "@/fsd/entity/User/model/store/user.store";
import { Combobox } from "@/fsd/shared/ui/Combobox";
import { MinusIcon, PlusCircleIcon, StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { buildStoreSwitcherUI } from "../lib/util";
import { useStoreSwitcherData } from "../model/store/storeSwitcher.store";
import { StoreSwitcherHandlerEnum } from "../type/handler.enum";
import { StoreSwitcherIconEnum } from "../type/icon.enum";
import { StoreSwitcherProps } from "../type/props.type";
import { IHandlerCollection, IIconCollection } from "../type/type";
import { useStoreModal } from "@/fsd/feature/ModalManager";
import toast from "react-hot-toast";

export const StoreSwitcher: FC<StoreSwitcherProps> = () => {
  const { storeSlug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  // TODO: one fsd layer
  const { onOpen } = useStoreModal();
  const router = useRouter();

  const { fetchStoreByUserIdAndCreateList, list, current, loading, error } =
    useStoreSwitcherData();

  // console.log(" =>>> list", list);
  const { user } = useUserData();

  useEffect(() => {
    if (user && user.id && storeSlug) {
      fetchStoreByUserIdAndCreateList(user.id, storeSlug as string);
    }
  }, [user, storeSlug]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
    <div className="flex">
      {/* {error && <div>{error}</div>} */}
      {loading && <div>loading..</div>}
      {!loading && !!list.length && (
        <Combobox
          isOpen={isOpen}
          onOpen={() => setIsOpen(!isOpen)}
          data={listItem}
          currentItem={current?.name}
          triggerIcon={<StoreIcon />}
          placeholderSearch="Search store..."
          placeholderEmpty="No store found"
        />
      )}
    </div>
  );
};
