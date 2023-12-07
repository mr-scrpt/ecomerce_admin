import { IStore } from "@/fsd/entity/Store";
import { IStoreSwitcherGroup } from "../type/store.type";
import { StoreSwitcherGropEnum } from "../type/group.enum";
import { IStoreSwitcherGroupUI } from "../type/group.type";
import { MinusIcon, PlusCircleIcon, StoreIcon } from "lucide-react";
import { StoreSwitcherIconEnum } from "../type/icon.enum";
import { StoreSwitcherHandlerEnum } from "../type/handler.enum";
import { IHandlerCollection, IIconCollection } from "../type/type";

export const mapStoreSwitcherListData = (
  list: IStore[],
  storeSlug: string,
): IStoreSwitcherGroup => ({
  groupName: StoreSwitcherGropEnum.StoreList,
  groupItemList: list.map((item) => ({
    name: item.name,
    value: item.id,
    icon: StoreSwitcherIconEnum.STORE,
    isActive: item.slug === storeSlug,
    slug: item.slug,
    handler: StoreSwitcherHandlerEnum.SELECT,
  })),
});

export const buildStoreSwitcherUI = (
  data: IStoreSwitcherGroup[],
  iconCollection: IIconCollection,
  handlerCollection: IHandlerCollection,
): IStoreSwitcherGroupUI[] => {
  console.log(" =>>>");
  return [
    ...data.map((group) => {
      return {
        groupName: group.groupName,
        groupItemList: group.groupItemList.map(
          ({ slug, icon, handler, ...rest }) => {
            return {
              ...rest,
              icon: iconCollection[icon],
              handler: handlerCollection[handler],
            };
          },
        ),
      };
    }),
  ];
};

// {
//     groupName: data.groupName,
//     groupItemList: data.groupItemList.map((item) => {
//       const { slug, ...rest } = item;
//       return rest;
//     } ]),
// }
