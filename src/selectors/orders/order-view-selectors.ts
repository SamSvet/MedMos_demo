import { createSelector } from "@reduxjs/toolkit";
import { OrdersRootState } from "../../store/orders-store";
import { additionalOrderData, mergeOrder } from "./order-selectors-helpers";

export const getOrderViewDataState = (state: OrdersRootState) =>
  state.orderViewData;
export const getOrderViewDeltaState = (state: OrdersRootState) =>
  state.orderViewDelta;

export const getOrderViewData = createSelector(
  getOrderViewDataState,
  (state) => state.data,
);

export const getOrderViewDelta = createSelector(
  getOrderViewDeltaState,
  (state) => state.delta,
);

export const getAdditionalOrderViewData = createSelector(
  getOrderViewDataState,
  additionalOrderData,
);

export const getOrderView = createSelector(
  getOrderViewData,
  getOrderViewDelta,
  mergeOrder,
);
