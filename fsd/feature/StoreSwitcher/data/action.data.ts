import { StoreSwitcherGropEnum } from "../type/group.enum";
import { StoreSwitcherHandlerEnum } from "../type/handler.enum";
import { StoreSwitcherIconEnum } from "../type/icon.enum";
import { IStoreSwitcherGroup } from "../type/store.type";

export const storeSwitcherActionData: IStoreSwitcherGroup = {
  groupName: StoreSwitcherGropEnum.ActionList,
  groupItemList: [
    {
      name: "Create New Store",
      icon: StoreSwitcherIconEnum.CREATE,
      isActive: false,
      value: "create",
      handler: StoreSwitcherHandlerEnum.CREATE,
      slug: "",
    },
    {
      name: "Remove Current Store",
      icon: StoreSwitcherIconEnum.REMOVE,
      isActive: false,
      value: "remove",
      handler: StoreSwitcherHandlerEnum.CREATE,
      slug: "",
    },
  ],
};
