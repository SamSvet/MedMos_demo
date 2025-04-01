import {
  CommonDeltaState,
  createCommonDeltaSlice,
} from "./common/common-delta";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../api/shared/common/api-response";
import { Delta } from "../../api/shared/common/delta";
import { MainLayoutData } from "../../api/shared/common/main-layout-data";

export interface OrderEditDeltaState extends CommonDeltaState {}

export const orderEditDelta = createCommonDeltaSlice<OrderEditDeltaState>({
  name: "orderEditDelta",
  reducers: {
    merge(
      state: OrderEditDeltaState,
      action: PayloadAction<ApiResponse<MainLayoutData>>,
    ): OrderEditDeltaState {
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
