import { HTMLAttributes } from "react";
import { OptionFormTypeSchema } from "./schema.type";

export interface OptionFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: OptionFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  // value: string;
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  datatype: string;
  value: IInitialItemFormData[];
}

interface IInitialItemFormData {
  name: string;
  value: string;
}
