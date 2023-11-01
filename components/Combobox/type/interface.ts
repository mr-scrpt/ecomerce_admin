export interface ComboboxItemI {
  name: string;
  value: string;
  icon: any;
  isActive: boolean;
  onSelectItem: (elem: string) => void;
}
export interface ComboboxGroupI {
  groupName: string;
  groupItemList: ComboboxItemI[];
}
