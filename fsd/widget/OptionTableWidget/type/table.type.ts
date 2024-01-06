import { OptionItem } from "@prisma/client";

export type OptionColumn = {
  id: string;
  name: string;
  slug: string;
  value: OptionItem[];
  createdAt: string;
};
