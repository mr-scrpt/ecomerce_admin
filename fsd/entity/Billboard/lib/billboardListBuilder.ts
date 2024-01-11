import { IBillboard } from "..";

export const billboardListBuilder = (list?: IBillboard[]) => {
  if (!list) {
    return [];
  }
  const res = list.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return res;
};
