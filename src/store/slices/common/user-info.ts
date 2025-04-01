import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataItem } from "../../../api/shared/common/response-data";
import { UserItem } from "../../../api/shared/common/users";
import { usersApi } from "../../../api/users-api";

export const getUserInfo = createAsyncThunk("user-info/getUserInfo", () => {
  return usersApi.getValuesFromUsersInfo();
});

export interface UserInfoState {
  users?: DataItem<UserItem>;
}

const initialState: UserInfoState = {};

export const userInfoSlice = createSlice({
  name: "user-info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.users = action.payload.data.users;
    });
    builder.addCase(getUserInfo.rejected, () => {
      // eslint-disable-next-line no-console
      console.log("Couldn't load user info");
    });
  },
});
