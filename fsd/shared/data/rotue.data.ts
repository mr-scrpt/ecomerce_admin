import { RouteNameEnum, RoutePathEnum } from "./route.enum";

export const routeData = (currentStore: string) => [
  {
    href: `/${currentStore}${RoutePathEnum.HOME}`,
    label: RouteNameEnum.HOME,
  },
  {
    href: `/${currentStore}${RoutePathEnum.BILBOARDS}`,
    label: RouteNameEnum.BILBOARDS,
  },
  {
    href: `/${currentStore}${RoutePathEnum.SETTINGS}`,
    label: RouteNameEnum.SETTINGS,
  },
];
