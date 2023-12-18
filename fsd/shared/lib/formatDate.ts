import { format } from "date-fns";
export const buildDate = (date: Date) => format(date, "do MMMM, yyyy");
