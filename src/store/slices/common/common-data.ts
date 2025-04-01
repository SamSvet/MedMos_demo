import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";

import { MainLayoutData } from "../../../api/shared/common/main-layout-data";
import { FilterData } from "../../../api/shared/common/filter-data";
import { ApiResponse } from "../../../api/shared/common/api-response";
import { ScreenData } from "../../../api/shared/common/screen-data";
import { BadAttributesMap } from "../../../api/shared/common/bad-attributes-map";

export interface CommonDataState {
  data: MainLayoutData;
  filter_data: FilterData | null;
  screen_data?: ScreenData;
  bad_attributes: BadAttributesMap | null;
}

export const defaultCommonDataState = <T extends CommonDataState>(): T => {
  return {
    data: {},
  } as T;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export const defaultCommonDataStateReducers = <T extends CommonDataState>(
  defaultState: () => T,
): ValidateSliceCaseReducers<T, SliceCaseReducers<T>> => {
  return {
    clear(state: T, action: PayloadAction<unknown>): T {
      return defaultState();
    },
    fill(state: T, action: PayloadAction<ApiResponse<MainLayoutData>>): T {
      const { data, filter_data, screen_data } = action.payload;
      return { data, filter_data, screen_data } as T;
    },
    setBadAttributes(
      state: T,
      action: PayloadAction<BadAttributesMap | null>,
    ): T {
      const bad_attributes = action.payload;
      return { ...state, bad_attributes };
    },
  } as ValidateSliceCaseReducers<T, SliceCaseReducers<T>>;
};

export interface CommonDataSliceOptions<T extends CommonDataState> {
  name: string;
  defaultState?: () => T;
  reducers?: ValidateSliceCaseReducers<T, SliceCaseReducers<T>>;
}

export type CommonDataSlice<T extends CommonDataState> = Slice<
  T,
  SliceCaseReducers<T>
>;

export const createCommonDataSlice = <T extends CommonDataState>(
  opts: CommonDataSliceOptions<T>,
): CommonDataSlice<T> => {
  const name = opts.name;
  const defaultState = opts.defaultState || defaultCommonDataState;
  const reducers = {
    ...defaultCommonDataStateReducers(defaultState),
    ...(opts.reducers || {}),
  };

  return createSlice({
    name,
    initialState: defaultState(),
    reducers,
  });
};
