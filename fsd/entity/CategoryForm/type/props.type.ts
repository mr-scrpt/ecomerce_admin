import { HTMLAttributes } from "react";
import { CategoryFormTypeSchema } from "./schema.type";
import { IBillboard } from "../../Billboard";
import { IOption } from "../../Option";

export interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: CategoryFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  billboardList: IBillboard[];
  optionList: IOption[];
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  billboardId: string;
}
