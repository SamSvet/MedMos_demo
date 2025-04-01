import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MainLayoutData } from "../../../api/shared/common/main-layout-data";
import { ApiResponse } from "../../../api/shared/common/api-response";
import { Delta } from "../../../api/shared/common/delta";

export type CommonDelta = Delta<MainLayoutData>;

export interface CommonDeltaState {
  delta: CommonDelta;
}

export const defaultCommonDeltaState = <T extends CommonDeltaState>(): T => {
  return {
    delta: {},
  } as T;
};

export const defaultCommonDeltaStateReducers = <T extends CommonDeltaState>(
  defaultState: () => T,
): ValidateSliceCaseReducers<T, SliceCaseReducers<T>> => {
  return {
    clear(_state: T, _action: PayloadAction<unknown>): T {
      return defaultState();
    },
    override(_state: T, action: PayloadAction<ApiResponse<MainLayoutData>>): T {
      const { delta } = action.payload;
      return { delta } as T;
    },
    merge(_state: T, action: PayloadAction<ApiResponse<MainLayoutData>>) {
      if (action.payload.delta && Object.keys(action.payload.delta).length) {
        throw new Error(
          "В каждом конркетном слайсе дельты должна быть своя реализация merge",
        );
      }
    },
  } as ValidateSliceCaseReducers<T, SliceCaseReducers<T>>;
};

export interface CommonDataSliceOptions<T extends CommonDeltaState> {
  name: string;
  defaultState?: () => T;
  reducers?: ValidateSliceCaseReducers<T, SliceCaseReducers<T>>;
}

export type CommonDeltaSlice<T extends CommonDeltaState> = Slice<
  T,
  SliceCaseReducers<T>
>;

export const createCommonDeltaSlice = <T extends CommonDeltaState>(
  opts: CommonDataSliceOptions<T>,
): CommonDeltaSlice<T> => {
  const name = opts.name;
  const defaultState = opts.defaultState || defaultCommonDeltaState;
  const reducers = {
    ...defaultCommonDeltaStateReducers(defaultState),
    ...(opts.reducers || {}),
  };
  return createSlice({
    name,
    initialState: defaultState(),
    reducers,
  });
};
