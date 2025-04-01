import { createSelector } from "@reduxjs/toolkit";
import { OrderInfoModel } from "../../api/shared/order-info";
import { orderModelToViewModel } from "../../api/shared/mappers/order-mappers";
import { OrdersRootState } from "../../store/orders-store";
import { additionalOrderData, mergeOrder } from "./order-selectors-helpers";
import { getCurrentRefBooks, getCurrentUsers } from "./common-order-selectors";

export const getOrderEditDataState = (state: OrdersRootState) =>
  state.orderEditData;
export const getOrderEditDeltaState = (state: OrdersRootState) =>
  state.orderEditDelta;

export const getOrderEditData = createSelector(
  getOrderEditDataState,
  (state) => state.data,
);

export const getOrderEditViewData = (state: OrdersRootState) => {
  return orderModelToViewModel(
    (state.orderEditData.data?.orders?.[0] as OrderInfoModel) || {},
    state.orderEditData.data.positions || [],
    getCurrentRefBooks(state),
    getCurrentUsers(state),
  );
};

export const getOrderEditDelta = createSelector(
  getOrderEditDeltaState,
  (state) => state.delta,
);

export const getAdditionalOrderEditData = createSelector(
  getOrderEditDataState,
  additionalOrderData,
);

export const getOrderEdit = createSelector(
  getOrderEditData,
  getOrderEditDelta,
  mergeOrder,
);
