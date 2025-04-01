import { ScreenCode } from "../../../api/shared/common/screen-code.enum";
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export interface ScreenState {
  code?: ScreenCode;
}

export const screenSlice = createSlice<
  ScreenState,
  SliceCaseReducers<ScreenState>
>({
  name: "screen",
  initialState: {},
  reducers: {
    setScreenCode(
      state: ScreenState,
      action: PayloadAction<ScreenCode>,
    ): ScreenState {
      const payloadCode = action.payload;
      const previousCode = state.code;
      const code = payloadCode || previousCode;
      return { ...state, code };
    },
  },
});
