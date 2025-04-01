import {
  CommonMessage,
  CommonMessageState,
  createCommonMessageSlice,
} from "./common-message";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModalInfo extends CommonMessage {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModalInfoState extends CommonMessageState<ModalInfo> {}

export const modalSlice = createCommonMessageSlice<
  CommonMessage,
  ModalInfoState
>({
  name: "modal",
});
