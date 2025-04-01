import { UserItem } from "./common/users";
import { NonOptionalKeys } from "../../utils/generic-types";
import { PositionInfoModel, PositionInfoViewModel } from "./position-info";
import { ContainerItem } from "./common/container";

export interface OrderInfo<DATE = Date, USERITEM = UserItem> {
  order_id?: string;
  order_name: string | null;
  order_manager: USERITEM | null;
  description: string | null;
  created?: DATE;
  created_by?: string | null;
  updated?: DATE;
  updated_by?: string | null;
  locked_till?: DATE;
}

export type OrderInfoModel = OrderInfo<string, string>;

export type OrderInfoViewModel = OrderInfo<Date, UserItem>;

export type OrderCreateInfoFields = NonOptionalKeys<OrderInfo>;

export type OrderCreateInfoModel = Pick<OrderInfoModel, OrderCreateInfoFields>;

export type OrderCreateInfoViewModel = Pick<
  OrderInfoViewModel,
  OrderCreateInfoFields
>;

export type OrderEditInfoFields =
  | "order_id"
  | "order_name"
  | "order_manager"
  | "description";

export type OrderEditInfoModel = Pick<OrderInfoModel, OrderEditInfoFields>;

export type OrderEditInfoViewModel = Pick<
  OrderInfoViewModel,
  OrderEditInfoFields
>;

export type OrderPosModel = {
  order: OrderInfoModel;
  position: PositionInfoModel;
};

export type TableModel = {
  order: OrderInfoModel;
  position: PositionInfoModel;
  container: ContainerItem;
};

export type OrderPosModelView = {
  order: OrderInfoViewModel;
  position: PositionInfoViewModel;
};
