import { CommonDataState, createCommonDataSlice } from "./common/common-data";
import { OrderBadAttributes } from "../../api/shared/order-bad-attributes";

export interface OrderViewDataState extends CommonDataState {
  bad_attributes: OrderBadAttributes | null;
}

export const orderViewData = createCommonDataSlice<OrderViewDataState>({
  name: "orderViewData",
});
