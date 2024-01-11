export { OptionAdd } from "./ui/OptionAdd/OptionAdd";
export {
  useOptionRemove,
  useOptionListStore,
  useOptionListCategory,
} from "./model/store/option.store";
export { selectDataType } from "./data/select";
export { optionListBuilder } from "./lib/optionListBuilder";

export * as optionAction from "./model/action/option.action";

export type { IOption } from "./type/entity.type";
export type { IGetOptionBySlugPayload } from "./type/action.type.ts";
