import { IOption } from "../../Option";

export const optionListBuilder = (list?: IOption[]) => {
  if (!list) {
    return [];
  }
  const res = list.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return res;
};
