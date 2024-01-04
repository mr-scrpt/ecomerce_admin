import { Color, Store } from "@prisma/client";

export interface IColor extends Color {}

export interface IColorWithRelations extends Color {
  store: Store;
}
