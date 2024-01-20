import { HTMLAttributes } from "react";
import { BillboardFormTypeSchema } from "./schema.type";

export interface BillboardFormProps extends HTMLAttributes<HTMLDivElement> {
  onAction: (form: BillboardFormTypeSchema) => void;
  onChangeName: (name: string) => void;
  handleOpenButton: () => void;
  actionName: string;
  defaultValues: IInitialFormData;
  loading: boolean;
  imgListLoaded: string[];
  disabledUploadeMoadlButton: boolean;
}

interface IInitialFormData {
  name: string;
  imgUrl: string[];
}
