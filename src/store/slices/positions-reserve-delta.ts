import { PayloadAction } from "@reduxjs/toolkit";
import {
  CommonDeltaState,
  createCommonDeltaSlice,
} from "./common/common-delta";
import { ApiResponse } from "../../api/shared/common/api-response";
import { Delta } from "../../api/shared/common/delta";
import { MainLayoutData } from "../../api/shared/common/main-layout-data";

export interface PositionsReserveDeltaState extends CommonDeltaState {}

export const positionsReserveDelta =
  createCommonDeltaSlice<PositionsReserveDeltaState>({
    name: "positionsReserveDelta",
    reducers: {
      merge(
        state: PositionsReserveDeltaState,
        action: PayloadAction<ApiResponse<MainLayoutData>>,
      ): PositionsReserveDeltaState {
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
