export interface ComboboxItemI {
  name: string;
  value: string;
  icon: any;
  isActive: boolean;
  handler: (elem: string) => void;
}
export interface ComboboxGroupI {
  groupName: string;
  groupItemList: ComboboxItemI[];
}
