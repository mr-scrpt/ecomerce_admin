import { RouteNameEnum, RoutePathEnum } from "./route.enum";

export const routeData = (currentStore: string) => [
  {
    href: `/${currentStore}${RoutePathEnum.HOME}`,
    label: RouteNameEnum.HOME,
  },
  {
    href: `/${currentStore}${RoutePathEnum.BILLBOARDS}`,
    label: RouteNameEnum.BILLBOARDS,
  },
  {
    href: `/${currentStore}${RoutePathEnum.SETTINGS}`,
    label: RouteNameEnum.SETTINGS,
  },
  {
    href: `/${currentStore}${RoutePathEnum.CATEGORIES}`,
    label: RouteNameEnum.CATEGORIES,
  },
];
