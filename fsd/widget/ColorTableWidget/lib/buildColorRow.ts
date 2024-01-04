import { IColorWithRelations } from "@/fsd/entity/Color/type/entity.type";
import { buildDate } from "@/fsd/shared/lib/formatDate";
import { IStoreColorTableItem } from "../type/store.type";

export const buildColorRow = (
  item: IColorWithRelations,
): IStoreColorTableItem => ({
  id: item.id,
  name: item.name,
  value: item.value,
  createdAt: buildDate(item.createdAt),
});
