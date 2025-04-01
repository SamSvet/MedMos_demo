import { createSelector } from "@reduxjs/toolkit";
import { OrderInfoModel } from "../../api/shared/order-info";
import { orderModelToViewModel } from "../../api/shared/mappers/order-mappers";
import { OrdersRootState } from "../../store/orders-store";
import { additionalPositionData, mergeOrder } from "./order-selectors-helpers";
import { getCurrentRefBooks, getCurrentUsers } from "./common-order-selectors";

export const getPositionsEditDataState = (state: OrdersRootState) =>
  state.positionsEditData;
export const getPositionsEditDeltaState = (state: OrdersRootState) =>
  state.positionsEditDelta;

export const getPositionEditData = createSelector(
  getPositionsEditDataState,
  (state) => state.data,
);

export const getPositionEditViewData = (state: OrdersRootState) => {
  return orderModelToViewModel(
    (state.positionsEditData.data?.orders?.[0] as OrderInfoModel) || {},
    state.positionsEditData.data.positions || [],
    getCurrentRefBooks(state),
    getCurrentUsers(state),
  );
};

export const getPositionEditDelta = createSelector(
  getPositionsEditDeltaState,
  (state) => state.delta,
);

export const getAdditionalPositionsEditData = createSelector(
  getPositionsEditDataState,
  additionalPositionData,
);

export const getPositionEdit = createSelector(
  getPositionEditData,
  getPositionEditDelta,
  mergeOrder,
);
