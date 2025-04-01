import { ModalInfo } from "../store/slices/common/modal";
import { PopupInfo } from "../store/slices/common/popup";
import { CommonMessage } from "../store/slices/common/common-message";
import { ApiResponse } from "../api/shared/common/api-response";
import { v4 } from "uuid";
import { ErrorCodes } from "../api/shared/common/errors";

const getMessageFromResponse = <T extends CommonMessage>(
  typeField: "modal" | "popup",
  response: ApiResponse
): T | undefined => {
  if (!response) {
    return undefined;
  }

  const type = response[typeField];
  if (!type) {
    return undefined;
  }

  const id = v4();
  const code: ErrorCodes = response.code as ErrorCodes;
  const message: string | undefined = response.message || undefined;
  return { id, code, type, message } as T;
};

export const getModalFromResponse = (
  response: ApiResponse
): ModalInfo | undefined => {
  return getMessageFromResponse("modal", response);
};

export const getPopupFromResponse = (
  response: ApiResponse
): PopupInfo | undefined => {
  return getMessageFromResponse("popup", response);
};
