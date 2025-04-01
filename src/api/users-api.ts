import { ApiResponse } from "./shared/common/api-response";
import { invokeJsonRpcRequest } from "./invoke-request/invoke-json-rpc-request";
import { UsersData } from "./shared/common/users";
import { TeamsData } from "./shared/common/teams";

export type UsersResponse = ApiResponse<UsersData>;
export type TeamsResponse = ApiResponse<TeamsData>;
export type UserInfoResponse = ApiResponse<UsersData>;

export type UsersParams = {
  users: { substring: string };
};
export type TeamsParams = {};

const USERS = "api/users";

export const usersApi = {
  selectValuesFromUsers(params: UsersParams): Promise<UsersResponse> {
    return invokeJsonRpcRequest(USERS, "users-get-value", params);
  },

  selectValuesFromTeams(params: TeamsParams): Promise<TeamsResponse> {
    return invokeJsonRpcRequest(USERS, "users-get-teams", params);
  },

  getValuesFromUsersInfo(): Promise<UserInfoResponse> {
    return invokeJsonRpcRequest(USERS, "users-get-info", {});
  },
};
