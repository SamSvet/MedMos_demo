import { CommonDataState, createCommonDataSlice } from "./common/common-data";
import { OrdersFilterDataModel } from "../../api/shared/orders-filter-data";

export interface OrderListDataState extends CommonDataState {
  filter_data: OrdersFilterDataModel;
}

export const orderListData = createCommonDataSlice<OrderListDataState>({
  name: "orderListData",
});
