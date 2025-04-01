/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { ErrorCodes } from "../../../api/shared/common/errors";

export interface CommonMessage {
  id: string;
  code?: ErrorCodes;
  type: string;
  message?: string;
}

export interface CommonMessageState<M extends CommonMessage> {
  list: ReadonlyArray<M>;
}

export function defaultCommonMessageState<
  M extends CommonMessage,
  S extends CommonMessageState<M>,
>(): S {
  const list: ReadonlyArray<M> = [];
  return { list } as S;
}

export function defaultCommonMessageStateReducers<
  M extends CommonMessage,
  S extends CommonMessageState<M>,
>(defaultState: () => S): ValidateSliceCaseReducers<S, SliceCaseReducers<S>> {
  return {
    clear(state: S, action: PayloadAction<unknown>): S {
      return defaultCommonMessageState();
    },
    addMessages(state: S, action: PayloadAction<Omit<M, "id">[]>): S {
      const newItems: ReadonlyArray<M> = (action?.payload || []).map((x) => {
        const id = v4();
        return { id, ...x } as M;
      });
      const list = [...state.list, ...newItems];
      return { list } as unknown as S;
    },
    removeMessages(state: S, action: PayloadAction<string[]>): S {
      const ids = action?.payload || [];
      const list: ReadonlyArray<M> = state.list.filter(
        (x) => ids.length === 0 || !ids.includes(x.id),
      );
      return { list } as unknown as S;
    },
  } as ValidateSliceCaseReducers<S, SliceCaseReducers<S>>;
}

export interface CommonMessageSliceOptions<
  M extends CommonMessage,
  S extends CommonMessageState<M>,
> {
  name: string;
  defaultState?: () => S;
  reducers?: ValidateSliceCaseReducers<S, SliceCaseReducers<S>>;
}

export type CommonMessageSlice<
  M extends CommonMessage,
  S extends CommonMessageState<M>,
> = Slice<S, SliceCaseReducers<S>>;

export function createCommonMessageSlice<
  M extends CommonMessage,
  S extends CommonMessageState<M>,
>(opts: CommonMessageSliceOptions<M, S>): CommonMessageSlice<M, S> {
  const name = opts.name;
  const defaultState = opts.defaultState || defaultCommonMessageState;
  const reducers = {
    ...defaultCommonMessageStateReducers(defaultState),
    ...(opts.reducers || {}),
  } as ValidateSliceCaseReducers<S, SliceCaseReducers<S>>;
  return createSlice({
    name,
    initialState: defaultState(),
    reducers: { ...reducers },
  });
}
