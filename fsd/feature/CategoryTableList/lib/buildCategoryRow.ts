import { ICategoryWithRelations } from "@/fsd/entity/Category/type/entity.type";
import { buildDate } from "@/fsd/shared/lib/formatDate";
import { IStoreCategoryTableItem } from "../type/store.type";

export const buildCategoryRow = (
  item: ICategoryWithRelations,
): IStoreCategoryTableItem => ({
  id: item.id,
  name: item.name,
  billboardName: item.billboard.name,
  createdAt: buildDate(item.createdAt),
});
