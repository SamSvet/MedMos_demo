import { OrderInfo } from "./order-info";
import { PositionInfo } from "./position-info";
import { DataItem } from "./common/response-data";
import { UserItem } from "./common/users";
import { ListItem } from "./common/list-item";
import { ContainerItem } from "./common/container";

export type OrderData<
  DATE = Date,
  USERITEM = UserItem,
  ITEM = ListItem,
  CONTAINERITEM = ContainerItem,
> = {
  orders: DataItem<OrderInfo<DATE, USERITEM>>;
  positions?: DataItem<PositionInfo<ITEM, CONTAINERITEM>>;
};

export type OrderDataModel = OrderData<string, string, string, string>;

export type OrderDataViewModel = OrderData<
  Date,
  UserItem,
  ListItem,
  ContainerItem
>;
