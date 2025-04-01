import { ApiResponse } from "./shared/common/api-response";
import { MainLayoutData } from "./shared/common/main-layout-data";
import { invokeJsonRpcRequest } from "./invoke-request/invoke-json-rpc-request";
import { OrderInfoModel } from "./shared/order-info";
import { ScreenData } from "./shared/common/screen-data";
import { OrdersFilterDataModel } from "./shared/orders-filter-data";
import { PositionCreateInfoModel, PositionInfo } from "./shared/position-info";

export type PositionsResponse = ApiResponse<MainLayoutData>;

export interface PositionsApi {
  showCreate(params: {
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse>;

  create(params: {
    positions: Partial<PositionCreateInfoModel>;
  }): Promise<PositionsResponse>;

  cancelCreate(params: {
    orders: { order_id: string };
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel;
  }): Promise<PositionsResponse>;

  showEdit(params: {
    positions: Partial<PositionCreateInfoModel>;
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse>;

  showReserve(params: {
    positions: Partial<PositionCreateInfoModel>;
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse>;

  list(params: {
    positions: Partial<PositionCreateInfoModel>;
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse>;

  update(params: {
    orders: { order_id: string };
    positions: Partial<PositionCreateInfoModel>;
  }): Promise<PositionsResponse>;

  cancelEdit(params: {
    orders: { order_id: string };
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel;
  }): Promise<PositionsResponse>;

  delete(params: {
    positions: { position_id: string };
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse>;
}

const positions = "api/positions";

export const positionsApi: PositionsApi = {
  showCreate(params: {
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-show-create", params);
  },

  list(params: {
    positions: Partial<PositionCreateInfoModel>;
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-list", params);
  },

  create(params: {
    positions: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-create", params);
  },

  cancelCreate(params: {
    orders: { order_id: string };
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-cancel-create", params);
  },

  showEdit(params: {
    positions: Partial<PositionCreateInfoModel>;
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-show-edit", params);
  },

  showReserve(params: {
    positions: Partial<PositionCreateInfoModel>;
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-show-reserve", params);
  },

  update(params: {
    orders: { order_id: string };
    positions: Partial<PositionInfo<string, string>>;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-update", params);
  },

  cancelEdit(params: {
    orders: { order_id: string };
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-cancel-edit", params);
  },

  delete(params: {
    positions: { position_id: string };
    orders: Partial<OrderInfoModel>;
  }): Promise<PositionsResponse> {
    return invokeJsonRpcRequest(positions, "positions-delete", params);
  },
};
