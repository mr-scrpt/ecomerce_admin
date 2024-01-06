import { SelectDataTypeEnum } from "../type/select.enum";

export const selectDataType = [
  { type: SelectDataTypeEnum.SELECT, value: "Select" },
  { type: SelectDataTypeEnum.MULT, value: "Multi select" },
  { type: SelectDataTypeEnum.CHECKBOX, value: "Checkbox" },
  { type: SelectDataTypeEnum.RADIO, value: "Radio" },
];
