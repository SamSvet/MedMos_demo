import { createSelector } from "@reduxjs/toolkit";
import { OrdersRootState } from "../../store/orders-store";
import { additionalPositionData, mergeOrder } from "./order-selectors-helpers";

export const getPositionsCreateDataState = (state: OrdersRootState) =>
  state.positionsCreateData;
export const getPositionsCreateDeltaState = (state: OrdersRootState) =>
  state.positionsCreateDelta;

export const getPositionCreateData = createSelector(
  getPositionsCreateDataState,
  (state) => state.data,
);

export const getPositionCreateDelta = createSelector(
  getPositionsCreateDeltaState,
  (state) => state.delta,
);

export const getAdditionalPositionsCreateData = createSelector(
  getPositionsCreateDataState,
  additionalPositionData,
);

export const getPositionCreate = createSelector(
  getPositionCreateData,
  getPositionCreateDelta,
  mergeOrder,
);

// const getPositionCreateOrderDataState = (state: OrdersRootState) =>
//   state.positionsCreateData;
// const getPositionCreateOrderDeltaState = (state: OrdersRootState) =>
//   state.positionsCreateDelta;

// const getPositionCreateOrderData = createSelector(
//   getPositionCreateOrderDataState,
//   (state) => state.data,
// );

// const getPositionCreateOrderDelta = createSelector(
//   getPositionCreateOrderDeltaState,
//   (state) => state.delta,
// );

// export const getPositionCreateOrder = createSelector(
//   getPositionCreateOrderData,
//   getPositionCreateOrderDelta,
//   mergeOrder,
// );
