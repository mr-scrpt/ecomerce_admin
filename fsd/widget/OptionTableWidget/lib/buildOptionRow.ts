import { buildDate } from "@/fsd/shared/lib/formatDate";
import { IStoreOptionTableItem } from "../type/store.type";
import { IOptionWithRelations } from "@/fsd/entity/Option";

export const buildOptionRow = (
  item: IOptionWithRelations,
): IStoreOptionTableItem => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  value: item.value,
  createdAt: buildDate(item.createdAt),
});
