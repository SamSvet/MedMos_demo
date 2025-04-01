import { createSelector } from "@reduxjs/toolkit";
import { OrdersRootState } from "../store/orders-store";

export const getAppVersionState = (state: OrdersRootState) => state.appVersion;

export const selectVersion = createSelector(
  getAppVersionState,
  (appVersionState) => {
    return appVersionState.sbc?.app.version;
  },
);
