import { createSelector } from "@reduxjs/toolkit";
import { OrderInfoModel } from "../../api/shared/order-info";
import { orderModelToViewModel } from "../../api/shared/mappers/order-mappers";
import { OrdersRootState } from "../../store/orders-store";
import { additionalPositionData, mergeOrder } from "./order-selectors-helpers";
import { getCurrentRefBooks, getCurrentUsers } from "./common-order-selectors";

export const getPositionsReserveDataState = (state: OrdersRootState) =>
  state.positionsReserveData;
export const getPositionsReserveDeltaState = (state: OrdersRootState) =>
  state.positionsReserveDelta;

export const getPositionReserveData = createSelector(
  getPositionsReserveDataState,
  (state) => state.data,
);

export const getPositionReserveViewData = (state: OrdersRootState) => {
  return orderModelToViewModel(
    (state.positionsReserveData.data?.orders?.[0] as OrderInfoModel) || {},
    state.positionsReserveData.data.positions || [],
    getCurrentRefBooks(state),
    getCurrentUsers(state),
  );
};

export const getPositionReserveDelta = createSelector(
  getPositionsReserveDeltaState,
  (state) => state.delta,
);

export const getAdditionalPositionsReserveData = createSelector(
  getPositionsReserveDataState,
  additionalPositionData,
);

export const getPositionReserve = createSelector(
  getPositionReserveData,
  getPositionReserveDelta,
  mergeOrder,
);
