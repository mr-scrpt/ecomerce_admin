import { IMultipleSelectorOption } from "@/fsd/shared/ui/MultipleSelector/MultipleSelector";
import { HTMLAttributes } from "react";
import { IBillboard } from "../../Billboard";
import { CategoryFormTypeSchema } from "./schema.type";

export interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: CategoryFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  billboardList: IBillboard[];
  optionList: IMultipleSelectorOption[];
  optionListSelected?: IMultipleSelectorOption[];
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  billboardId: string;
}
