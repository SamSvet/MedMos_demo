import { createSelector } from "@reduxjs/toolkit";
import {
  orderListModelToViewModel,
  orderListPosModelToTableModel,
  orderListPosModelToViewModel,
} from "../../api/shared/mappers/order-list-mappers";
import { OrdersRootState } from "../../store/orders-store";
import { getRefbooks } from "./order-selectors-helpers";

export const getOrderListDataState = (state: OrdersRootState) =>
  state.orderListData;

export const getOrderList = createSelector(getOrderListDataState, (state) => {
  return {
    ...state.data,
    orders: orderListModelToViewModel(state.data.orders!, state.data.users),
  };
});

export const getOrderPosList = createSelector(
  getOrderListDataState,
  (state) => {
    return {
      ...state.data,
      viewdata: orderListPosModelToViewModel(
        state.data.orderpos!,
        getRefbooks(state.data),
        state.data.users,
        state.data.containers,
      ),
    };
  },
);

export const getTableList = createSelector(getOrderListDataState, (state) => {
  return {
    ...state.data,
    viewdata: orderListPosModelToTableModel(
      state.data.orderpos!,
      getRefbooks(state.data),
      state.data.users,
      state.data.containers,
    ),
  };
});

export const getAdditionalOrderListData = createSelector(
  getOrderListDataState,
  (state) => ({
    screen_data: state.screen_data,
    filter_data: state.filter_data,
    bad_attributes: state.bad_attributes,
  }),
);
