import { IBillboard } from "@/fsd/entity/Billboard/type/entity.type";
import { buildDate } from "@/fsd/shared/lib/formatDate";

export const buildBillboardRow = (item: IBillboard) => ({
  id: item.id,
  name: item.name,
  createdAt: buildDate(item.createdAt),
});
