import { createSelector } from "reselect";
import { OrdersRootState } from "../store/orders-store";

const getModalSlice = (state: OrdersRootState) => state.modal;

const getPopupSlice = (state: OrdersRootState) => state.popup;

export const getModalList = createSelector(getModalSlice, (state) => {
  return state.list[0];
});

export const getPopupList = createSelector(getPopupSlice, (state) => {
  return state.list[0];
});
