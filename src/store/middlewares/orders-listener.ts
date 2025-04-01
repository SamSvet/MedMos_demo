import {
  createListenerMiddleware,
  TypedStartListening,
  TypedAddListener,
  TypedRemoveListener,
  addListener,
  removeListener,
  ListenerEffectAPI,
} from "@reduxjs/toolkit";
import type { OrdersRootState, OrdersDispatch } from "../orders-store";

export const ordersListener = createListenerMiddleware();

export type OrdersStartListening = TypedStartListening<
  OrdersRootState,
  OrdersDispatch
>;
export type OrdersListenerEffectAPI = ListenerEffectAPI<
  OrdersRootState,
  OrdersDispatch
>;

export const startOrdersListening =
  ordersListener.startListening as OrdersStartListening;

export const addOrdersListener = addListener as TypedAddListener<
  OrdersRootState,
  OrdersDispatch
>;

export const removeOrdersListener = removeListener as TypedRemoveListener<
  OrdersRootState,
  OrdersDispatch
>;
