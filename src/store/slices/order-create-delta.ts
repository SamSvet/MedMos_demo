import { PayloadAction } from "@reduxjs/toolkit";
import {
  CommonDeltaState,
  createCommonDeltaSlice,
} from "./common/common-delta";

import { ApiResponse } from "../../api/shared/common/api-response";
import { Delta } from "../../api/shared/common/delta";
import { MainLayoutData } from "../../api/shared/common/main-layout-data";

export interface OrderCreateDeltaState extends CommonDeltaState {}

export const orderCreateDelta = createCommonDeltaSlice<OrderCreateDeltaState>({
  name: "orderCreateDelta",
  reducers: {
    merge(
      state: OrderCreateDeltaState,
      action: PayloadAction<ApiResponse<MainLayoutData>>,
    ): OrderCreateDeltaState {
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
