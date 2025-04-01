import { PayloadAction } from "@reduxjs/toolkit";
import {
  CommonDeltaState,
  createCommonDeltaSlice,
} from "./common/common-delta";
import { ApiResponse } from "../../api/shared/common/api-response";
import { MainLayoutData } from "../../api/shared/common/main-layout-data";
import { Delta } from "../../api/shared/common/delta";

export interface OrderListDeltaState extends CommonDeltaState {}

export const orderListDelta = createCommonDeltaSlice<OrderListDeltaState>({
  name: "orderListDelta",
  reducers: {
    merge(
      state: OrderListDeltaState,
      action: PayloadAction<ApiResponse<MainLayoutData>>,
    ): OrderListDeltaState {
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
