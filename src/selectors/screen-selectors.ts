import { createSelector } from "reselect";
import { OrdersRootState } from "../store/orders-store";

const getScreenState = (state: OrdersRootState) => state.screen;

export const getScreenCode = createSelector(
  getScreenState,
  (state) => state.code,
);
