import { ListItem } from "../common/list-item";
import { OrderInfo } from "../order-info";
import { PositionInfo } from "../position-info";

export type OrdersViewModelValue =
  | string
  | ListItem[]
  | Date
  | boolean
  | number
  | undefined;

export type OrdersField = keyof OrderInfo;
export type OrdersFieldFile = keyof OrderInfo | "file";
export type PositionField = keyof PositionInfo;

export type OrdersViewModelInfo = {
  [field in OrdersField]?: OrdersViewModelValue;
};
