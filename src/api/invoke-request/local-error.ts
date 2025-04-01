import { t } from "i18next";
import { ApiResponse } from "../shared/common/api-response";
import { ErrorCodes, ErrorModals } from "../shared/common/errors";
import { ResponseStatus } from "../shared/common/response-status.enum";

export class LocalError extends Error {
  private _errorModal: ApiResponse | null = null;
  private _errorPopup: ApiResponse | null = null;
  private _response: ApiResponse | null = null;

  private getErrorData(
    code: ErrorCodes,
    message: string | null,
    modal: ErrorModals = ErrorModals.SYSTEM_ERROR,
    isPopup?: boolean,
  ) {
    return {
      code,
      message,
      modal: !isPopup ? modal : null,
      popup: isPopup ? modal : null,
      screen: null,
      bad_attributes: null,
      data: {},
      filter_data: null,
      inner_errors: null,
      screen_data: null,
      response: ResponseStatus.fail,
    };
  }

  constructor(cause: string | undefined, response?: Response) {
    super(cause);
    switch (response?.status) {
      case 401:
        this._errorModal = this.getErrorData(
          ErrorCodes.NOT_AUTHENTICATED,
          t("notificationModal.notAuthenticatedMessage"),
          ErrorModals.FAIL,
        );
        break;
      case 403:
        this._errorPopup = this.getErrorData(
          ErrorCodes.NO_ACCESS,
          t("notificationModal.noAccessMessage"),
          ErrorModals.NO_ACCESS,
          true,
        );
        break;
      default:
        this._errorModal = this.getErrorData(
          ErrorCodes.SYSTEM_ERROR,
          cause || null,
        );
        break;
    }
  }

  public get errorModal(): ApiResponse | null {
    return this._errorModal;
  }
  public get errorPopup(): ApiResponse | null {
    return this._errorPopup;
  }
  public get response(): ApiResponse | null {
    return this._response;
  }
}
