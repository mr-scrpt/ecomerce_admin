import { Billboard, Category } from "@prisma/client";
// import { IBillboard } from "../../Billboard";

export interface ICategory extends Category {}

export interface ICategoryWithRelations extends Category {
  billboard: Billboard;
}
