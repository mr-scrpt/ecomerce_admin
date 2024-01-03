import { Size, Store } from "@prisma/client";

export interface ISize extends Size {}

export interface ISizeWithRelations extends Size {
  store: Store;
}
