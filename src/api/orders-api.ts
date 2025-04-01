import { ApiResponse } from "./shared/common/api-response";
import { MainLayoutData } from "./shared/common/main-layout-data";
import { ScreenData } from "./shared/common/screen-data";
import { OrdersFilterDataModel } from "./shared/orders-filter-data";
import { invokeJsonRpcRequest } from "./invoke-request/invoke-json-rpc-request";
import { responseWithFile } from "../utils/response-with-file";
import { OrderCreateInfoModel, OrderEditInfoModel } from "./shared/order-info";

const ORDERS = "api/orders";

export type OrderResponse = ApiResponse<MainLayoutData>;

export interface OrderPDFParams {
  order_id: string;
}

export const ordersApi = {
  list(params: {
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel;
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-list", params);
  },

  show(params: {
    orders: { order_id: string };
    screen_data?: ScreenData;
    filter_data?: OrdersFilterDataModel | null;
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-show", params);
  },

  showCreate(): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-show-create", null);
  },

  createNew(params: {
    orders: Partial<OrderCreateInfoModel>;
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-create-new", {
      ...params,
    });
  },

  cancelCreate(params: {
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel | null;
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-cancel-create", params);
  },

  showEdit(params: {
    orders: { order_id: string };
    screen_data?: ScreenData;
    filter_data: OrdersFilterDataModel | null;
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-show-edit", params);
  },

  update(params: {
    orders: Partial<OrderEditInfoModel>;
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-update", {
      ...params,
    });
  },

  updateApprove(params: {
    orders: Partial<OrderEditInfoModel>;
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-update-approve", {
      ...params,
    });
  },

  cancelEdit(params: {
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel | null;
    orders: { order_id: string };
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-cancel-edit", params);
  },

  approve(params: {
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel | null;
    orders: {
      order_id: string;
      approve_note?: string;
    };
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-approve", params);
  },

  needEdit(params: {
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel;
    orders: {
      order_id: string;
      approve_note?: string;
    };
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-need-edit", params);
  },

  deactivate(params: {
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel | null;
    orders: {
      order_id: string;
      close_reason?: string;
    };
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-deactivate", params);
  },

  exportOrder(params: OrderPDFParams): Promise<OrderResponse> {
    return invokeJsonRpcRequest(
      ORDERS,
      "orders-get-pdf",
      params,
      undefined,
      responseWithFile,
    );
  },
  exportOrderAll(): Promise<OrderResponse> {
    return invokeJsonRpcRequest(
      ORDERS,
      "orders-download-file",
      null,
      undefined,
      responseWithFile,
    );
  },

  lockProlong(params: {
    orders: { order_id: string };
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(ORDERS, "orders-lock-prolong", params);
  },

  approvalList(params: {
    screen_data: ScreenData;
    filter_data: OrdersFilterDataModel | null;
  }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(
      "orders-get-approvallist",
      "orders-approval",
      params,
    );
  },

  uploadFile(params: { data: FormData }): Promise<OrderResponse> {
    return invokeJsonRpcRequest(
      ORDERS,
      "orders-upload-file",
      null,
      params.data,
    );
  },
};
