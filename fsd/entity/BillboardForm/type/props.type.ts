import { HTMLAttributes } from "react";
import { BillboardFormTypeSchema } from "./schema.type";

export interface BillboardFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: BillboardFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  imgUrl: string;
}
