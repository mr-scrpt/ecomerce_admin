import { IMultipleSelectorOption } from "@/fsd/shared/ui/MultipleSelector/MultipleSelector";
import { HTMLAttributes } from "react";
import { IBillboard } from "../../Billboard";
import { CategoryFormTypeSchema } from "./schema.type";
import { IFormSelect } from "@/fsd/shared/type/formSelect.type";

export interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: CategoryFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  // billboardList: IBillboard[];
  billboardList: IFormSelect[];
  optionList: IFormSelect[];
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  billboardId: string;
}
