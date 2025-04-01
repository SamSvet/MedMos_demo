import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAppVersion = createAsyncThunk(
  "app-version/getAppVersion",
  async () => {
    const response = await fetch("/version/version.json");
    const parsedResponse = await response.json();
    return parsedResponse;
  },
);

export interface AppVersionState {
  sbc?: {
    app: {
      name: string;
      version: string;
      "cumulative-version": string;
    };
  };
}

const initialState: AppVersionState = {};

export const appVersionSlice = createSlice({
  name: "app-version",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppVersion.fulfilled, (state, action) => {
      state.sbc = action.payload.sbc;
    });
    builder.addCase(getAppVersion.rejected, () => {
      // eslint-disable-next-line no-console
      console.log("Couldn't load /version/version.json");
    });
  },
});
