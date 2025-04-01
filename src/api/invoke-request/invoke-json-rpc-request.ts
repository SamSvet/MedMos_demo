import { v4 } from "uuid";
import { invokeRequest } from "./invoke-request";
import { ApiResponse } from "../shared/common/api-response";
import { ResponseStatus } from "../shared/common/response-status.enum";
import { JsonRpcResponse } from "../shared/common/json-rpc-response";
import { ResponseData } from "../shared/common/response-data";
import { LocalError } from "./local-error";

const jsonrpc = "2.0";

if (!process.env.REACT_APP_API_URL) {
  throw new Error("process.env.REACT_APP_API_URL is not defined");
}

const API_URL: string = process.env.REACT_APP_API_URL.trim();

const prepareUrl = (url: string) => {
  let cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  if (url.endsWith("/")) {
    cleanUrl = cleanUrl.slice(0, -1);
  }
  return cleanUrl ? `${API_URL}/${cleanUrl}/` : `${API_URL}/`;
};

const createRpcPayload = <P>(method: string, params: P, data?: FormData) => {
  const id = v4();
  const json = { method, jsonrpc, id, params };
  if (!!data) {
    data.append("request", JSON.stringify(json));
    return data;
  }
  return json;
};

export const invokeJsonRpcRequest = async <P, R extends ResponseData<R>>(
  url: string,
  method: string,
  params: P | null = null,
  data?: FormData,
  makeResult?: (response: Response) => Promise<JsonRpcResponse<R>>,
): Promise<ApiResponse<R>> => {
  const realUrl = prepareUrl(url);
  const payload: {} | FormData = createRpcPayload(method, params || {}, data);
  const additionalHeaders = new Headers();
  additionalHeaders.append("X-Sbc-JsonRPC-Method", method);

  try {
    const response = (await invokeRequest(
      realUrl,
      payload,
      makeResult,
      additionalHeaders,
    )) as unknown as JsonRpcResponse<ApiResponse<R>>;

    if (response.result.response === ResponseStatus.fail) {
      throw response.result;
    }
    return response.result as ApiResponse<R>;
  } catch (error) {
    if (error instanceof LocalError) {
      throw error;
    }
    const response: ApiResponse<R> = error as ApiResponse<R>;
    const errorModal = response.modal ? response : null;
    const errorPopup = response.popup ? response : null;
    throw { errorModal, errorPopup, response };
  }
};
