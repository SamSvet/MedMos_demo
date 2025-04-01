import { PayloadAction } from "@reduxjs/toolkit";
import {
  CommonDeltaState,
  createCommonDeltaSlice,
} from "./common/common-delta";

export interface DictionaryViewDeltaState extends CommonDeltaState {}

export const dictionaryViewDelta =
  createCommonDeltaSlice<DictionaryViewDeltaState>({
    name: "dictionaryViewDelta",
    reducers: {
      merge(state: DictionaryViewDeltaState, action: PayloadAction<unknown>) {
        // TODO
      },
    },
  });
