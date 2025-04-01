import {
  CommonDeltaState,
  createCommonDeltaSlice,
} from "./common/common-delta";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../api/shared/common/api-response";
import { Delta } from "../../api/shared/common/delta";
import { MainLayoutData } from "../../api/shared/common/main-layout-data";

export interface OrderViewDeltaState extends CommonDeltaState {}

export const orderViewDelta = createCommonDeltaSlice<OrderViewDeltaState>({
  name: "orderViewDelta",
  reducers: {
    merge(
      state: OrderViewDeltaState,
      action: PayloadAction<ApiResponse<MainLayoutData>>,
    ): OrderViewDeltaState {
      const { delta: oldDelta } = state;
      const { delta: newDelta } = action.payload;

      const delta = {
        ...oldDelta,
        ...newDelta,
      } as Delta<MainLayoutData>;

      return { delta };
    },
  },
});
