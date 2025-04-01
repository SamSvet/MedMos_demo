import { BadAttributesMap } from "../../../../../api/shared/common/bad-attributes-map";
import { ContainerItem } from "../../../../../api/shared/common/container";
import { ListItem } from "../../../../../api/shared/common/list-item";
import { DataItem } from "../../../../../api/shared/common/response-data";
import { PositionInfo } from "../../../../../api/shared/position-info";
import { OptionsSettings } from "../../../../../components/RefBox";

export enum AttrType {
  Text = "text",
  Ref = "ref",
  RefMulti = "refMulti",
  Date = "date",
  RefModel = "refModel",
  Descr = "descr",
  Number = "number",
  Container = "container",
  TextStatic = "textStatic",
}

export type ValueType =
  | string
  | ListItem
  | ListItem[]
  | ContainerItem
  | ContainerItem[]
  | Date
  | boolean
  | null
  | number;

export type OptionsType = DataItem<ListItem> | DataItem<ContainerItem>;
export interface OptionsCreateType<T extends ListItem | ContainerItem> {
  data: DataItem<T>;
  bad_attributes?: BadAttributesMap | null;
}

export type OptionsSettingsType =
  | OptionsSettings<ListItem>
  | OptionsSettings<ContainerItem>;

export interface ICheckboxModel {
  id: string;
  disabled?: boolean;
  update?: (value: ValueType) => void;
  checked: boolean | undefined;
}
// export interface IPositionAttrBase {
//   type: AttrType;
//   id: keyof PositionInfo;
//   label: string;
//   required?: boolean;
//   readOnly?: boolean;
//   hidden?: boolean;
//   value?: ValueType;
//   variant?: "standard" | "filled" | "outlined";
//   update?: (value: ValueType) => void;
//   getDataOptions?: (substring: string) => Promise<OptionsType>;
//   createOption?: (newOption: ValueType) => Promise<OptionsType>;
//   optionSettings?: OptionsSettingsType;
//   linkAttr?: ICheckboxModel;
//   disabled?: boolean;
//   error: boolean;
//   errorText?: string;
//   notDeletableOptions?: ValueType[];
//   minDate?: Date;
//   maxDate?: Date;
//   minValue?: number;
//   maxValue?: number;
//   "data-test-id"?: string;
//   helperText?: string;
// }

export interface IPositionAttrBase {
  type: AttrType;
  id: keyof PositionInfo;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  value?: ValueType;
  variant?: "standard" | "filled" | "outlined";
  update?: (value: ValueType | null) => void;
  getDataOptions?: (substring: string) => Promise<OptionsType>;
  createOption?: (
    newOption: ValueType,
  ) => Promise<OptionsCreateType<ListItem | ContainerItem>>;
  optionSettings?: OptionsSettingsType;
  linkAttr?: ICheckboxModel;
  disabled?: boolean;
  error: boolean;
  errorText?: string;
  notDeletableOptions?: ValueType[];
  minDate?: Date;
  maxDate?: Date;
  minValue?: number;
  maxValue?: number;
  "data-test-id"?: string;
  helperText?: string;
}
