import { HTMLAttributes } from "react";
import { SizeFormTypeSchema } from "./schema.type";

export interface SizeFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: SizeFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  // value: string;
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  value: string;
}
