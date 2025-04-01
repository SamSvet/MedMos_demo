/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export interface GlobalIndicatorState {
  counter: number;
  isInProgress?: boolean;
}

const initialState = {
  counter: 0,
};

export const globalIndicator = createSlice<
  GlobalIndicatorState,
  SliceCaseReducers<GlobalIndicatorState>
>({
  name: "globalIndicator",
  initialState,
  reducers: {
    show(
      state: GlobalIndicatorState,
      action: PayloadAction<unknown>,
    ): GlobalIndicatorState {
      const counter = state.counter + 1;
      const isInProgress = counter > 0;
      return { counter, isInProgress };
    },
    hide(
      state: GlobalIndicatorState,
      action: PayloadAction<unknown>,
    ): GlobalIndicatorState {
      const counter = state.counter > 0 ? state.counter - 1 : 0;
      const isInProgress = counter > 0;
      return { counter, isInProgress };
    },
  },
});
