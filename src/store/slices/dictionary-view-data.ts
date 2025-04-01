import { CommonDataState, createCommonDataSlice } from "./common/common-data";

export interface DictionaryViewDataState extends CommonDataState {}

export const dictionaryViewData =
  createCommonDataSlice<DictionaryViewDataState>({
    name: "dictionaryViewData",
  });
