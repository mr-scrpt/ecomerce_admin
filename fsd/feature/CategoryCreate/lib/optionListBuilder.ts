import { Option } from "@/fsd/shared/ui/MultipleSelector/MultipleSelector";

export const optionListIdBuilder = (list?: Option[]): Array<string> => {
  if (!list) {
    return [];
  }
  const res = list.map((item) => item.value);

  return res;
};
