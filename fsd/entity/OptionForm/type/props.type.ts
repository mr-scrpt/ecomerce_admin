import { HTMLAttributes } from "react";
import { OptionFormTypeSchema } from "./schema.type";
import { SelectDataTypeEnum } from "../../Option/type/select.enum";

export interface OptionFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: OptionFormTypeSchema) => void;
  actionName: string;
  defaultValues: IInitialFormData;
  // value: string;
  loading: boolean;
}

interface IInitialFormData {
  name: string;
  datatype: SelectDataTypeEnum;
  value: IInitialItemFormData[];
}

interface IInitialItemFormData {
  name: string;
  value: string;
}
