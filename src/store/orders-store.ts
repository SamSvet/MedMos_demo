import { createContext } from "react";
import {
  ReactReduxContextValue,
  createSelectorHook,
  createDispatchHook,
  createStoreHook,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { screenSlice } from "./slices/common/screen-slice";
import { globalIndicator } from "./slices/common/global-indicator";
import { modalSlice } from "./slices/common/modal";
import { popupSlice } from "./slices/common/popup";
// import { lockedOrderSlice } from "./slices/common/locked-order";
import { appVersionSlice } from "./slices/common/app-version";
import { userInfoSlice } from "./slices/common/user-info";
import { orderListData } from "./slices/order-list-data";
import { orderListDelta } from "./slices/order-list-delta";
import { orderViewDelta } from "./slices/order-view-delta";
import { orderViewData } from "./slices/order-view-data";
import { orderCreateData } from "./slices/order-create-data";
import { orderCreateDelta } from "./slices/order-create-delta";
import { orderEditData } from "./slices/order-edit-data";
import { orderEditDelta } from "./slices/order-edit-delta";
import { dictionaryViewData } from "./slices/dictionary-view-data";
import { dictionaryViewDelta } from "./slices/dictionary-view-delta";
import { ordersApprovalDelta } from "./slices/order-approval-delta";
import { ordersApprovalData } from "./slices/order-approval-data";
import { positionsCreateData } from "./slices/positions-create-data";
import { positionsCreateDelta } from "./slices/positions-create-delta";
import { positionsEditData } from "./slices/positions-edit-data";
import { positionsEditDelta } from "./slices/positions-edit-delta";
import { positionsListDelta } from "./slices/positions-list-delta";
import { positionsListData } from "./slices/positions-list-data";
import { positionsReserveData } from "./slices/positions-reserve-data";
import { positionsReserveDelta } from "./slices/positions-reserve-delta";

export const ordersStore = configureStore({
  reducer: {
    screen: screenSlice.reducer,
    globalIndicator: globalIndicator.reducer,
    modal: modalSlice.reducer,
    popup: popupSlice.reducer,
    // lockedorder: lockedOrderSlice.reducer,
    appVersion: appVersionSlice.reducer,
    userInfo: userInfoSlice.reducer,

    orderListData: orderListData.reducer,
    orderListDelta: orderListDelta.reducer,
    orderViewData: orderViewData.reducer,
    orderViewDelta: orderViewDelta.reducer,
    orderCreateData: orderCreateData.reducer,
    orderCreateDelta: orderCreateDelta.reducer,
    orderEditData: orderEditData.reducer,
    orderEditDelta: orderEditDelta.reducer,
    positionsCreateData: positionsCreateData.reducer,
    positionsCreateDelta: positionsCreateDelta.reducer,
    positionsEditData: positionsEditData.reducer,
    positionsEditDelta: positionsEditDelta.reducer,
    positionsReserveData: positionsReserveData.reducer,
    positionsReserveDelta: positionsReserveDelta.reducer,
    ordersApprovalData: ordersApprovalData.reducer,
    ordersApprovalDelta: ordersApprovalDelta.reducer,
    positionsListData: positionsListData.reducer,
    positionsListDelta: positionsListDelta.reducer,

    dictionaryViewData: dictionaryViewData.reducer,
    dictionarViewDelta: dictionaryViewDelta.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().prepend(ordersListener.middleware),
});

export type OrdersStore = typeof ordersStore;
export type OrdersDispatch = typeof ordersStore.dispatch;
export type OrdersRootState = ReturnType<typeof ordersStore.getState>;

export const OrdersContext = createContext<
  ReactReduxContextValue<OrdersRootState>
>({} as ReactReduxContextValue<OrdersRootState>);

export const useOrdersStore = createStoreHook(OrdersContext);
export const useOrdersSelector = createSelectorHook(OrdersContext);
export const useOrdersDispatch: () => OrdersDispatch =
  createDispatchHook(OrdersContext);
