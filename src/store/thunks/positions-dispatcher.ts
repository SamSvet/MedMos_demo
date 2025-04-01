import { NavigateFunction } from "react-router-dom";
import { createLayoutDispatchFn } from "./common/dispatch-utils";
import { OrdersDispatch, OrdersRootState } from "../orders-store";
import { positionsApi } from "../../api/positions-api";
import { PositionCreateInfoModel } from "../../api/shared/position-info";
import { OrderInfoModel } from "../../api/shared/order-info";
import { OrdersFilterDataModel } from "../../api/shared/orders-filter-data";
import { ScreenData } from "../../api/shared/common/screen-data";

export const positionsDispatcher: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withNavigate: (navigate: NavigateFunction) => any; // TODO интерфейс
} = {
  withNavigate(navigate: NavigateFunction) {
    return {
      showCreate(params: {
        orders: Partial<OrderInfoModel>;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.showCreate(params),
          undefined,
          navigate,
        );
      },

      create(params: {
        positions: Partial<PositionCreateInfoModel>;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.create(params),
          undefined,
          navigate,
        );
      },

      cancelCreate(params: {
        orders: { order_id: string };
        screen_data: ScreenData;
        filter_data: OrdersFilterDataModel;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.cancelCreate(params),
          undefined,
          navigate,
        );
      },

      showEdit(params: {
        positions: Partial<PositionCreateInfoModel>;
        orders: Partial<OrderInfoModel>;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.showEdit(params),
          undefined,
          navigate,
        );
      },

      showReserve(params: {
        positions: Partial<PositionCreateInfoModel>;
        orders: Partial<OrderInfoModel>;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.showReserve(params),
          undefined,
          navigate,
        );
      },

      list(params: {
        positions: Partial<PositionCreateInfoModel>;
        orders: Partial<OrderInfoModel>;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.list(params),
          undefined,
          navigate,
        );
      },

      update(params: {
        orders: { order_id: string };
        positions: Partial<PositionCreateInfoModel>;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.update(params),
          undefined,
          navigate,
        );
      },

      cancelEdit(params: {
        orders: { order_id: string };
        screen_data: ScreenData;
        filter_data: OrdersFilterDataModel;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.cancelEdit(params),
          undefined,
          navigate,
        );
      },

      delete(params: {
        positions: { position_id: string };
        orders: Partial<OrderInfoModel>;
      }): (
        dispatch: OrdersDispatch,
        getStore: () => OrdersRootState,
      ) => Promise<unknown> {
        return createLayoutDispatchFn(
          () => positionsApi.delete(params),
          undefined,
          navigate,
        );
      },
    };
  },
};
