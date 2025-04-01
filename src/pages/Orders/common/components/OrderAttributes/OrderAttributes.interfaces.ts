import { ListItem } from "../../../../../api/shared/common/list-item";
import { DataItem } from "../../../../../api/shared/common/response-data";
import { TeamItem } from "../../../../../api/shared/common/teams";
import { UserItem } from "../../../../../api/shared/common/users";
import { OptionsSettings } from "../../../../../components/RefBox";

export enum AttrType {
  Text = "text",
  Ref = "ref",
  Tag = "tag",
  Descr = "descr",
  User = "user",
  Team = "team",
}

export type ValueType =
  | string
  | ListItem
  | ListItem[]
  | UserItem
  | UserItem[]
  | TeamItem
  | TeamItem[]
  | null;
type OptionsType = DataItem<ListItem> | DataItem<UserItem> | DataItem<TeamItem>;
type OptionsSettingsType =
  | OptionsSettings<ListItem>
  | OptionsSettings<UserItem>
  | OptionsSettings<TeamItem>;

export interface IAttrBase {
  type: AttrType;
  id: string;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  error: boolean;
  errorText?: string;
  value?: ValueType;
  update?: (value: ValueType) => void;
  getDataOptions?: (substring: string) => Promise<OptionsType>;
  getDataOptionsTeam?: () => Promise<OptionsType>;
  optionSettings?: OptionsSettingsType;
  notDeletableOptions?: ValueType[];
}
