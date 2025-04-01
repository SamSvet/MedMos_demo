import { createSelector } from "@reduxjs/toolkit";
import { OrdersRootState } from "../../store/orders-store";
import { additionalOrderData, mergeOrder } from "./order-selectors-helpers";

export const getOrderCreateDataState = (state: OrdersRootState) =>
  state.orderCreateData;
export const getOrderCreateDeltaState = (state: OrdersRootState) =>
  state.orderCreateDelta;

export const getOrderCreateData = createSelector(
  getOrderCreateDataState,
  (state) => state.data,
);

export const getOrderCreateDelta = createSelector(
  getOrderCreateDeltaState,
  (state) => state.delta,
);

export const getAdditionalOrderCreateData = createSelector(
  getOrderCreateDataState,
  additionalOrderData,
);

export const getOrderCreate = createSelector(
  getOrderCreateData,
  getOrderCreateDelta,
  mergeOrder,
);
