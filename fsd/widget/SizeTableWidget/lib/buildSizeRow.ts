import { ISizeWithRelations } from "@/fsd/entity/Size/type/entity.type";
import { buildDate } from "@/fsd/shared/lib/formatDate";
import { IStoreSizeTableItem } from "../type/store.type";

export const buildSizeRow = (
  item: ISizeWithRelations,
): IStoreSizeTableItem => ({
  id: item.id,
  name: item.name,
  value: item.value,
  createdAt: buildDate(item.createdAt),
});
