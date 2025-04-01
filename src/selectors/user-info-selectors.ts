import { createSelector } from "@reduxjs/toolkit";
import { OrdersRootState } from "../store/orders-store";

export const getUserInfoState = (state: OrdersRootState) => state.userInfo;

export const selectUserInfo = createSelector(
  getUserInfoState,
  (userInfoState) => {
    return userInfoState.users;
  },
);
