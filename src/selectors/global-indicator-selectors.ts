import { createSelector } from "reselect";
import { OrdersRootState } from "../store/orders-store";
import { GlobalIndicatorState } from "../store/slices/common/global-indicator";

const getIndicatorState = (state: OrdersRootState) => state.globalIndicator;

export const getIsInProgress = createSelector(
  getIndicatorState,
  (state: GlobalIndicatorState) => state.isInProgress,
);
