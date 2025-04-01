import {
  CommonDeltaState,
  createCommonDeltaSlice,
} from "./common/common-delta";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../api/shared/common/api-response";
import { MainLayoutData } from "../../api/shared/common/main-layout-data";
import { Delta } from "../../api/shared/common/delta";

export interface OrdersApprovalDeltaState extends CommonDeltaState {}

export const ordersApprovalDelta =
  createCommonDeltaSlice<OrdersApprovalDeltaState>({
    name: "ordersApprovalDelta",
    reducers: {
      merge(
        state: OrdersApprovalDeltaState,
        action: PayloadAction<ApiResponse<MainLayoutData>>,
      ): OrdersApprovalDeltaState {
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
