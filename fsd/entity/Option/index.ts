export { OptionAdd } from "./ui/OptionAdd/OptionAdd";
export { useOptionRemove, useOptionList } from "./model/store/option.store";
export { selectDataType } from "./data/select";

export * as optionAction from "./model/action/option.action";

export type { IOption, IOptionWithRelations } from "./type/entity.type";
export type { IGetOptionBySlugPayload } from "./type/action.type.ts";
