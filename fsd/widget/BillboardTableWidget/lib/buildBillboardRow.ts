import { IBillboard } from "@/fsd/entity/Billboard";
import { buildDate } from "@/fsd/shared/lib/formatDate";
import { IStoreBillboardTableItem } from "../../../entity/Billboard/type/store.type";

export const buildBillboardRow = (
  item: IBillboard,
): IStoreBillboardTableItem => ({
  id: item.id,
  name: item.name,
  createdAt: buildDate(item.createdAt),
});
