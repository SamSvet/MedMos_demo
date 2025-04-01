import { NonOptionalKeys } from "../../utils/generic-types";
import { ContainerItem } from "./common/container";
import { ListItem } from "./common/list-item";

export interface PositionInfo<ITEM = ListItem, CONTAINER = ContainerItem> {
  position_id?: string;
  order_id: string | null;
  position_name: string | null;
  color: ITEM | null;
  position_description: string | null;
  model_id: ITEM | null;
  count: number | null;
  reserved_count: number | null;
  //container?: ITEM[] | null;
  container?: CONTAINER[] | null;
  status?: ITEM | null;
  position_item_id?: string[] | null;
  //plan_delivery_dt?: DATE;
}

export type PositionInfoModel = PositionInfo<string, string>;

export type PositionInfoViewModel = PositionInfo<ListItem, ContainerItem>;

export type PositionCreateInfoFields = NonOptionalKeys<PositionInfo>;

export type PositionCreateInfoModel = Pick<
  PositionInfoModel,
  PositionCreateInfoFields
>;

export type PositionCreateInfoViewModel = Pick<
  PositionInfoViewModel,
  PositionCreateInfoFields
>;

export type PositionEditInfoFields =
  | "position_id"
  | "position_name"
  | "color"
  | "order_id"
  | "position_description"
  | "model_id"
  | "container"
  | "status"
  | "position_item_id";
// | "plan_delivery_dt"

export type PositionEditInfoModel = Pick<
  PositionInfoModel,
  PositionEditInfoFields
>;

export type PositionEditInfoViewModel = Pick<
  PositionInfoViewModel,
  PositionEditInfoFields
>;
