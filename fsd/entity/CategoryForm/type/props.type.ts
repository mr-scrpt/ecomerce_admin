import { HTMLAttributes } from "react";
import { CategoryFormTypeSchema } from "./schema.type";
import { IBillboard } from "../../Billboard";

export interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: CategoryFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  billboardList: IBillboard[];
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  billboardId: string;
}
