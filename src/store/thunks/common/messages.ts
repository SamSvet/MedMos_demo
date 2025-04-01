import { PopupInfo, popupSlice } from "../../slices/common/popup";
import { ModalInfo, modalSlice } from "../../slices/common/modal";
import { OrdersDispatch } from "../../orders-store";
import { ErrorCodes } from "../../../api/shared/common/errors";

export const showModal = (modal: Partial<ModalInfo>) => {
  return (dispatch: OrdersDispatch) => {
    dispatch(modalSlice.actions.addMessages([modal]));
  };
};

export const hideModal = () => (dispatch: OrdersDispatch) => {
  dispatch(modalSlice.actions.clear(""));
};

export const showPopup =
  (...popups: Partial<PopupInfo>[]) =>
  (dispatch: OrdersDispatch) => {
    dispatch(popupSlice.actions.addMessages(popups));
  };

export const hideAllPopups = () => (dispatch: OrdersDispatch) => {
  dispatch(popupSlice.actions.clear(""));
};

export const hidePopups =
  (...ids: string[]) =>
  (dispatch: OrdersDispatch) => {
    dispatch(popupSlice.actions.removeMessages(ids));
  };

export const showCustomError =
  (message: string) => (dispatch: OrdersDispatch) => {
    const code = ErrorCodes.SYSTEM_ERROR;
    dispatch(showModal({ code, message, type: "fail" }));
  };

export const showModalAndPopup =
  (modal?: ModalInfo, popup?: PopupInfo) => (dispatch: OrdersDispatch) => {
    if (modal) {
      dispatch(showModal(modal));
    }
    if (popup) {
      dispatch(showPopup(popup));
    }
  };
