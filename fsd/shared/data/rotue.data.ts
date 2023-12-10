import { RoutePathEnum } from "./route.enum";

export const routeData = (currentStore: string) => [
  {
    href: `/${currentStore}${RoutePathEnum.HOME}`,
    label: "Overview",
  },
  {
    href: `/${currentStore}${RoutePathEnum.SETTINGS}`,
    label: "Settings",
  },
];
