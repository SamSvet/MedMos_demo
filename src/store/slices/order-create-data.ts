import { OrderBadAttributes } from "../../api/shared/order-bad-attributes";
import { CommonDataState, createCommonDataSlice } from "./common/common-data";

export interface OrderCreateDataState extends CommonDataState {
  bad_attributes: OrderBadAttributes | null;
}

export const orderCreateData = createCommonDataSlice<OrderCreateDataState>({
  name: "orderCreateData",
});
