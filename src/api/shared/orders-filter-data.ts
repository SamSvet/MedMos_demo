import { UserItem } from "./common/users";
import { FilterData } from "./common/filter-data";
import { ListItem } from "./common/list-item";
import { ContainerItem } from "./common/container";

export interface OrderFilters<DATE, USERITEM> {
  order_name?: string;
  order_manager?: USERITEM;
  created?: DATE;
  updated?: DATE;
}

export interface PositionFilters<ITEM, CONTAINERITEM> {
  position_name?: string;
  color?: ITEM;
  container?: CONTAINERITEM;
  model_id?: ITEM;
  status?: ITEM;
}

export interface ContainerFilters<DATE> {
  start_plan_delivery_dt?: DATE;
  end_plan_delivery_dt?: DATE;
}

export interface OrdersFilters<
  DATE = Date,
  USERITEM = UserItem,
  ITEM = ListItem,
  CONTAINERITEM = ContainerItem,
> {
  orders?: OrderFilters<DATE, USERITEM>;
  positions?: PositionFilters<ITEM, CONTAINERITEM>;
  containers?: ContainerFilters<DATE>;
}

export type OrdersFiltersModel = OrdersFilters<string, string, string, string>;

export type OrdersFiltersViewModel = OrdersFilters<
  Date,
  UserItem,
  ListItem,
  ContainerItem
>;

export interface OrdersFilterData<
  DATE = Date,
  USERITEM = UserItem,
  ITEM = ListItem,
  CONTAINERITEM = ContainerItem,
> extends FilterData,
    OrdersFilters<DATE, USERITEM, ITEM, CONTAINERITEM> {
  ordering: string;
}

export type OrdersFilterDataModel = OrdersFilterData<
  string,
  string,
  string,
  string
>;
export type OrdersFilterDataViewModel = OrdersFilterData<
  Date,
  UserItem,
  ListItem,
  ContainerItem
>;

export type OrdersFilterableEntities = keyof Omit<OrdersFilterData, "ordering">;
