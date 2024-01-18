import { OptionItem } from "@prisma/client";

export type OptionColumnType = {
  id: string;
  name: string;
  slug: string;
  value: OptionItem[];
  createdAt: string;
};
