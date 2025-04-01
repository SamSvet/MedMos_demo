import { NavigateFunction } from "react-router-dom";
import { ordersApi, OrderPDFParams } from "../../api/orders-api";
import { ScreenData } from "../../api/shared/common/screen-data";
import {
  createLayoutDispatchFn,
  ProceedDataResponse,
} from "./common/dispatch-utils";
import { OrdersDispatch, OrdersRootState } from "../orders-store";
import { OrdersFilterDataModel } from "../../api/shared/orders-filter-data";
import { FileInfoData } from "../../utils/response-with-file";
import { eliminateIfEmptyObj } from "../../utils/eliminate-if-empty";
import { SCREEN_DATA_DEFAULT } from "../../constants/sd-fd";
import {
  OrderCreateInfoModel,
  OrderEditInfoModel,
} from "../../api/shared/order-info";
import { OrdersSortDataModel } from "../../api/shared/orders-sort-data";

interface OrdersDispatcherFn {
  (dispatch: OrdersDispatch, getStore: () => OrdersRootState): Promise<unknown>;
}
interface OrdersDispatcherDispatchable {
  list: () => OrdersDispatcherFn;
  show: (params: { orders: { order_id: string } }) => OrdersDispatcherFn;
  showCreate: () => OrdersDispatcherFn;
  createNew: (params: {
    orders: Partial<OrderCreateInfoModel>;
  }) => OrdersDispatcherFn;
  cancelCreate: () => OrdersDispatcherFn;
  showEdit: (params: { orders: { order_id: string } }) => OrdersDispatcherFn;
  cancelEdit: (params: { orders: { order_id: string } }) => OrdersDispatcherFn;
  update: (params: {
    orders: Partial<OrderEditInfoModel>;
  }) => OrdersDispatcherFn;
  updateApprove: (params: {
    orders: Partial<OrderEditInfoModel>;
  }) => OrdersDispatcherFn;
  approve: (params: {
    orders: { order_id: string; approve_note?: string };
  }) => OrdersDispatcherFn;
  needEdit: (params: {
    orders: { order_id: string; approve_note?: string };
  }) => OrdersDispatcherFn;
  deactivate: (params: {
    orders: { order_id: string; close_reason?: string };
  }) => OrdersDispatcherFn;
  exportOrder: (
    params: OrderPDFParams,
    proceedData?: (data: FileInfoData) => ProceedDataResponse,
  ) => OrdersDispatcherFn;
  exportOrderAll: (
    proceedData?: (data: FileInfoData) => ProceedDataResponse,
  ) => OrdersDispatcherFn;
  approvalList: () => OrdersDispatcherFn;
  uploadFile: (params: { data: FormData }) => OrdersDispatcherFn;
}

interface OrdersDispatcherSettings {
  withFilterData: (
    filterData?: OrdersFilterDataModel | null,
  ) => OrdersDispatcherDispatchable & OrdersDispatcherSettings;
  withScreenData: (
    screenData?: ScreenData,
  ) => OrdersDispatcherDispatchable & OrdersDispatcherSettings;
  withSortData: (
    sortData?: OrdersSortDataModel | null,
  ) => OrdersDispatcherDispatchable & OrdersDispatcherSettings;
}

interface IOrdersDispatcher {
  withNavigate: (
    navigate: NavigateFunction,
  ) => OrdersDispatcherDispatchable & OrdersDispatcherSettings;
}

class OrdersDispatcher implements IOrdersDispatcher {
  private navigate: NavigateFunction | null = null;
  private filterData: OrdersFilterDataModel | null = null;
  private screenData: ScreenData = SCREEN_DATA_DEFAULT;
  private sortData: OrdersSortDataModel | null = null;

  private constructor() {}

  private get dispatchableMethods(): OrdersDispatcherDispatchable {
    return {
      list: this.list.bind(this),
      show: this.show.bind(this),
      showCreate: this.showCreate.bind(this),
      createNew: this.createNew.bind(this),
      cancelCreate: this.cancelCreate.bind(this),
      showEdit: this.showEdit.bind(this),
      cancelEdit: this.cancelEdit.bind(this),
      update: this.update.bind(this),
      updateApprove: this.updateApprove.bind(this),
      approve: this.approve.bind(this),
      needEdit: this.needEdit.bind(this),
      deactivate: this.deactivate.bind(this),
      exportOrder: this.exportOrder.bind(this),
      exportOrderAll: this.exportOrderAll.bind(this),
      approvalList: this.getApprovalList.bind(this),
      uploadFile: this.uploadFile.bind(this),
    };
  }

  private get settingMethods(): OrdersDispatcherSettings {
    return {
      withFilterData: this.withFilterData.bind(this),
      withScreenData: this.withScreenData.bind(this),
      withSortData: this.withSortData.bind(this),
    };
  }

  private get fdSdParams() {
    return {
      screen_data: { ...this.screenData },
      filter_data: this.filterData ? { ...this.filterData } : null,
      sort_data: this.sortData ? [...this.sortData] : null,
    };
  }

  private clearSettings() {
    this.navigate = null;
    this.filterData = null;
    this.screenData = SCREEN_DATA_DEFAULT;
  }

  private list(): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const params = {
      ...this.fdSdParams,
    };
    if (!params.screen_data || !params.filter_data) {
      throw new Error("screen_data & filter_data are required");
    }
    const res = createLayoutDispatchFn(
      () => {
        return ordersApi.list(
          params as {
            screen_data: ScreenData;
            filter_data: OrdersFilterDataModel;
          },
        );
      },
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private show(params: {
    orders: { order_id: string };
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const combinedParams = { ...params, ...this.fdSdParams };
    const res = createLayoutDispatchFn(
      () => ordersApi.show(combinedParams),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private showCreate(): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const res = createLayoutDispatchFn(
      () => ordersApi.showCreate(),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private createNew(params: {
    orders: Partial<OrderCreateInfoModel>;
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const res = createLayoutDispatchFn(
      () => ordersApi.createNew(params),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private cancelCreate(): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const params = { ...this.fdSdParams };
    const res = createLayoutDispatchFn(
      () => ordersApi.cancelCreate(params),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private showEdit(params: {
    orders: { order_id: string };
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const combinedParams = { ...params, ...this.fdSdParams };
    const res = createLayoutDispatchFn(
      () => ordersApi.showEdit(combinedParams),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private update(params: {
    orders: Partial<OrderEditInfoModel>;
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const res = createLayoutDispatchFn(
      () => ordersApi.update(params),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private updateApprove(params: {
    orders: Partial<OrderEditInfoModel>;
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const res = createLayoutDispatchFn(
      () => ordersApi.updateApprove(params),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private cancelEdit(params: {
    orders: { order_id: string };
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const combinedParams = { ...params, ...this.fdSdParams };
    const res = createLayoutDispatchFn(
      () => ordersApi.cancelEdit(combinedParams),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private approve(params: {
    orders: {
      order_id: string;
      approve_note?: string;
    };
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const combinedParams = { ...params, ...this.fdSdParams };
    const res = createLayoutDispatchFn(
      () => ordersApi.approve(combinedParams),
      undefined,
      this.navigate,
    );
    OrdersDispatcher.Instance.clearSettings();
    return res;
  }

  private needEdit(params: {
    orders: {
      order_id: string;
      approve_note?: string;
    };
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const combinedParams = { ...params, ...this.fdSdParams };
    if (!combinedParams.screen_data || !combinedParams.filter_data) {
      throw new Error("screen_data & filter_data are required");
    }
    const res = createLayoutDispatchFn(
      () =>
        ordersApi.needEdit(
          combinedParams as {
            screen_data: ScreenData;
            filter_data: OrdersFilterDataModel;
            orders: {
              order_id: string;
              approve_note: string;
            };
          },
        ),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private deactivate(params: {
    orders: {
      order_id: string;
      close_reason?: string;
    };
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const combinedParams = { ...params, ...this.fdSdParams };
    const res = createLayoutDispatchFn(
      () => ordersApi.deactivate(combinedParams),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private exportOrder(
    params: OrderPDFParams,
    proceedData?: (data: FileInfoData) => ProceedDataResponse,
  ): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const res = createLayoutDispatchFn(
      () => ordersApi.exportOrder(params),
      proceedData,
    );
    this.clearSettings();
    return res;
  }
  private exportOrderAll(
    proceedData?: (data: FileInfoData) => ProceedDataResponse,
  ): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const res = createLayoutDispatchFn(
      () => ordersApi.exportOrderAll(),
      proceedData,
    );
    this.clearSettings();
    return res;
  }

  private getApprovalList(): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const params = { ...this.fdSdParams };
    const res = createLayoutDispatchFn(
      () => ordersApi.approvalList(params),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private uploadFile(params: {
    data: FormData;
  }): (
    dispatch: OrdersDispatch,
    getStore: () => OrdersRootState,
  ) => Promise<unknown> {
    const res = createLayoutDispatchFn(
      () => ordersApi.uploadFile(params),
      undefined,
      this.navigate,
    );
    this.clearSettings();
    return res;
  }

  private withFilterData(filterData?: OrdersFilterDataModel | null) {
    this.filterData = eliminateIfEmptyObj<OrdersFilterDataModel>(
      filterData || undefined,
    );
    return { ...this.dispatchableMethods, ...this.settingMethods };
  }

  private withScreenData(screenData?: ScreenData) {
    this.screenData =
      eliminateIfEmptyObj<ScreenData>(screenData) || SCREEN_DATA_DEFAULT;
    return { ...this.dispatchableMethods, ...this.settingMethods };
  }

  private withSortData(sortData?: OrdersSortDataModel | null) {
    this.sortData = sortData ? [...sortData] : null;
    return { ...this.dispatchableMethods, ...this.settingMethods };
  }

  withNavigate(navigate: NavigateFunction) {
    this.navigate = navigate;
    return { ...this.dispatchableMethods, ...this.settingMethods };
  }

  static readonly Instance = new OrdersDispatcher();
}

export const ordersDispatcher = OrdersDispatcher.Instance;
