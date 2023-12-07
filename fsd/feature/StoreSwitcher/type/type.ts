import { ReactNode } from "react";

export interface IHandlerCollection {
  [StoreSwitcherHandlerEnum: string]: (str: string) => void;
}
export interface IIconCollection {
  [StoreSwitcherIconEnum: string]: ReactNode;
}
