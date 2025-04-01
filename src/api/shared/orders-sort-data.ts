import { NestedKeyOf } from "../../utils/generic-types";
import { DataItem } from "./common/response-data";
import { OrderInfo, OrderPosModel } from "./order-info";
import { PositionInfo } from "./position-info";

type sortItem = {
  index: number;
  desc: boolean;
};

interface OrdersSortDataModelItem {
  id: NestedKeyOf<OrderPosModel>;
  desc: boolean;
}
export type OrdersSortDataModel = DataItem<OrdersSortDataModelItem>;

export interface OrdersSortDataModel2 {
  orders: {
    [key in keyof OrderInfo]?: sortItem;
  }[];
  positions: {
    [key in keyof PositionInfo]?: sortItem;
  }[];
}
