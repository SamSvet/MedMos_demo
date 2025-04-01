import { ApiResponse } from "./shared/common/api-response";
import { invokeJsonRpcRequest } from "./invoke-request/invoke-json-rpc-request";
import { ContainerItem, ContainersData } from "./shared/common/container";
import { ValueType } from "../pages/Orders/common/components/PositionAttributes/PositionAttributes.interfaces";

export type ContainersResponse = ApiResponse<ContainersData>;

export type ContainersParams = {
  containers: { substring: string };
};

export type ContainersCreateParams = {
  containers: { newOption: ContainerItem };
};
export type TeamsParams = {};

const CONTAINERS = "api/containers";

export const containersApi = {
  selectValuesFromContainers(
    params: ContainersParams,
  ): Promise<ContainersResponse> {
    return invokeJsonRpcRequest(CONTAINERS, "containers-get-value", params);
  },

  createNewContainer(
    params: ContainersCreateParams,
  ): Promise<ContainersResponse> {
    return invokeJsonRpcRequest(CONTAINERS, "containers-create", params);
  },
};
