import { Delta } from "../../api/shared/common/delta";
import { MainLayoutData } from "../../api/shared/common/main-layout-data";
import { ScreenCode } from "../../api/shared/common/screen-code.enum";
import { OrderDataModel } from "../../api/shared/order-data";
import { OrderInfoModel } from "../../api/shared/order-info";
import { PositionInfoModel } from "../../api/shared/position-info";
import { OrdersDispatch } from "../orders-store";
import { orderCreateDelta } from "../slices/order-create-delta";
import { orderEditDelta } from "../slices/order-edit-delta";
import { orderViewDelta } from "../slices/order-view-delta";
import { positionsCreateDelta } from "../slices/positions-create-delta";
import { positionsEditDelta } from "../slices/positions-edit-delta";

export const synchronizeOrderDelta =
  (allFormData: OrderDataModel, screenCode: ScreenCode) =>
  (dispatch: OrdersDispatch) => {
    const delta: Delta<MainLayoutData> = allFormData;
    switch (screenCode) {
      case ScreenCode.ORDERS_CREATE:
        dispatch(orderCreateDelta.actions.merge({ delta }));
        break;
      case ScreenCode.ORDERS_EDIT:
        dispatch(orderEditDelta.actions.merge({ delta }));
        break;
      case ScreenCode.ORDERS_VIEW:
        dispatch(orderViewDelta.actions.merge({ delta }));
        break;
    }
  };

export const synchronizePositionDelta =
  (
    allFormData: {
      orders: Partial<OrderInfoModel>[];
      positions: Partial<PositionInfoModel>[];
    },
    screenCode: ScreenCode,
  ) =>
  (dispatch: OrdersDispatch) => {
    const delta: Delta<MainLayoutData> = allFormData as OrderDataModel;
    switch (screenCode) {
      case ScreenCode.POSITIONS_CREATE:
        dispatch(positionsCreateDelta.actions.merge({ delta }));
        break;
      case ScreenCode.ORDERS_SHOW:
        dispatch(positionsEditDelta.actions.merge({ delta }));
        break;
    }
  };
