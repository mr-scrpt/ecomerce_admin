import { IBillboard } from "@/fsd/entity/Billboard";
import { buildDate } from "@/fsd/shared/lib/formatDate";
import { IBillboardTableItem } from "../type/table.type";

export const buildBillboardRow = (item: IBillboard): IBillboardTableItem => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  createdAt: buildDate(item.createdAt),
});
