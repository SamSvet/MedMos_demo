import { OrderInfo } from "./order-info";
import { BadAttributesMap } from "./common/bad-attributes-map";
import { PositionInfo } from "./position-info";

export interface OrderBadAttributes extends BadAttributesMap {
  orders: {
    [key in keyof OrderInfo]?: string | string[];
  }[];
  positions: {
    [key in keyof PositionInfo]?: string | string[];
  }[];
}
