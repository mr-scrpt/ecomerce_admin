export interface IComboboxItem {
  name: string;
  value: string;
  icon: any;
  isActive: boolean;
  // onSelectItem: (elem: string) => void;
}
export interface IComboboxGroup {
  groupName: string;
  groupItemList: IComboboxItem[];
  onSelectItem: (elem: string) => void;
}
