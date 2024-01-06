import { IOptionWithRelations } from "@/fsd/entity/Option/type/entity.type";
import { buildDate } from "@/fsd/shared/lib/formatDate";
import { IStoreOptionTableItem } from "../type/store.type";

export const buildOptionRow = (
  item: IOptionWithRelations,
): IStoreOptionTableItem => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  value: item.value,
  createdAt: buildDate(item.createdAt),
});
