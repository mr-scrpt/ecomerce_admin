import { HTMLAttributes } from "react";
import { ColorFormTypeSchema } from "./schema.type";

export interface ColorFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: ColorFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  // value: string;
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  value: string;
}
