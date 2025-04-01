import { CommonDataState, createCommonDataSlice } from "./common/common-data";
import { OrderBadAttributes } from "../../api/shared/order-bad-attributes";

export interface OrderEditDataState extends CommonDataState {
  bad_attributes: OrderBadAttributes | null;
}

export const orderEditData = createCommonDataSlice<OrderEditDataState>({
  name: "orderEditData",
});
