import { createSelector } from "@reduxjs/toolkit";
import { orderListModelToViewModel } from "../../api/shared/mappers/order-list-mappers";
import { OrdersRootState } from "../../store/orders-store";
import { getRefbooks } from "./order-selectors-helpers";

export const getOrdersApprovalDataState = (state: OrdersRootState) =>
  state.ordersApprovalData;
export const getOrdersApprovalDeltaState = (state: OrdersRootState) =>
  state.ordersApprovalDelta;

export const getOrdersToApprove = createSelector(
  getOrdersApprovalDataState,
  (state) => ({
    ...state.data,
    orders: orderListModelToViewModel(state.data.orders!, state.data.users),
  }),
);

export const getAdditionalOrdersApprovalData = createSelector(
  getOrdersApprovalDataState,
  (state) => ({
    screen_data: state.screen_data,
    filter_data: state.filter_data,
    bad_attributes: state.bad_attributes,
  }),
);
