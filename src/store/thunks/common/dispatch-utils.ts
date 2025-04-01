import { ApiResponse } from "../../../api/shared/common/api-response";
import { ResponseData } from "../../../api/shared/common/response-data";
import { showModalAndPopup } from "./messages";
import { globalIndicatorFactory } from "./global-indicator";
import {
  getModalFromResponse,
  getPopupFromResponse,
} from "../../../utils/messages-utils";
import { setScreen } from "./screen";
import { MainLayoutData } from "../../../api/shared/common/main-layout-data";
import { setBadAttributes, updateData, updateDelta } from "./update-store";
import { OrdersDispatch } from "../../orders-store";
import { batch } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import {
  OrdersField,
  PositionField,
} from "../../../api/shared/mappers/orders-interfaces";

export interface ProceedDataResponse {
  proceedNext: boolean;
}

export type ScreenAdditionParam = {
  [key in OrdersField | PositionField]?: string | null;
};

export const simpleDispatchFn = async <R extends ResponseData<R>>(
  dispatch: OrdersDispatch,
  method: () => Promise<ApiResponse<R>>,
): Promise<ApiResponse<R>> => {
  try {
    const response = await method();
    const popup = getPopupFromResponse(response);
    dispatch(showModalAndPopup(undefined, popup));
    return response;
  } catch (e) {
    const { errorModal, errorPopup, response } = e as {
      errorModal: ApiResponse;
      errorPopup: ApiResponse;
      response: unknown;
    };
    const modal = getModalFromResponse(errorModal);
    const popup = getPopupFromResponse(errorPopup);
    dispatch(showModalAndPopup(modal, popup));
    throw response;
  }
};

export const baseDispatchFn = async <R extends ResponseData<R>>(
  dispatch: OrdersDispatch,
  method: () => Promise<ApiResponse<R>>,
): Promise<ApiResponse<R>> => {
  const indicator = globalIndicatorFactory.create(dispatch);
  indicator.showIndicator();
  try {
    const apiResponse = await method();
    indicator.hideIndicator();
    const modal = getModalFromResponse(apiResponse);
    const popup = getPopupFromResponse(apiResponse);
    dispatch(showModalAndPopup(modal, popup));
    return apiResponse;
  } catch (e) {
    indicator.hideIndicator();
    const { errorModal, errorPopup, response } = e as {
      errorModal: ApiResponse;
      errorPopup: ApiResponse;
      response: unknown;
    };
    const modal = getModalFromResponse(errorModal);
    const popup = getPopupFromResponse(errorPopup);
    dispatch(showModalAndPopup(modal, popup));
    throw response;
  }
};

export const createLayoutDispatchFn =
  <R>(
    method: () => Promise<ApiResponse<MainLayoutData>>,
    // eslint-disable-next-line
    proceedData: (data: R) => ProceedDataResponse = (data: R) => ({
      proceedNext: true,
    }),
    navigateFunc?: NavigateFunction | null,
  ) =>
  async (dispatch: OrdersDispatch) => {
    try {
      const response = await baseDispatchFn(dispatch, method);
      const { proceedNext } = proceedData(response.data as unknown as R);

      if (!proceedNext) {
        return null;
      }

      batch(() => {
        const screenAdditionParam: ScreenAdditionParam = {
          order_id:
            response.data.orders?.[0]?.order_id ||
            response.data.positions?.[0]?.order_id ||
            response.data.orderpos?.[0]?.order.order_id,
          position_id:
            response.data.positions?.[0]?.position_id ||
            response.data.orderpos?.[0]?.position.position_id,
        };
        dispatch(setScreen(response.screen, navigateFunc, screenAdditionParam));
        dispatch(updateData(response));
        dispatch(updateDelta(response));
      });
    } catch (errorResponse) {
      if (!errorResponse) {
        return null;
      }
      const { bad_attributes = undefined, screen } =
        errorResponse as ApiResponse;
      batch(() => {
        dispatch(setScreen(screen, navigateFunc));
        dispatch(updateDelta(errorResponse as ApiResponse<MainLayoutData>));
        dispatch(setBadAttributes(bad_attributes!));
      });
    }
  };
