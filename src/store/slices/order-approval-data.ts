import { CommonDataState, createCommonDataSlice } from "./common/common-data";
import { OrdersFilterDataModel } from "../../api/shared/orders-filter-data";

export interface OrdersApprovalDataState extends CommonDataState {
  filter_data: OrdersFilterDataModel;
}

export const ordersApprovalData =
  createCommonDataSlice<OrdersApprovalDataState>({
    name: "ordersApprovalData",
  });
