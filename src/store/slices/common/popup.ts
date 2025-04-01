import {
  CommonMessage,
  CommonMessageState,
  createCommonMessageSlice,
} from "./common-message";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PopupInfo extends CommonMessage {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PopupInfoState extends CommonMessageState<PopupInfo> {}

export const popupSlice = createCommonMessageSlice<PopupInfo, PopupInfoState>({
  name: "popup",
});
