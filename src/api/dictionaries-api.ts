import { DirectoryData } from "./shared/common/directory-data";
import { ApiResponse } from "./shared/common/api-response";
import { invokeJsonRpcRequest } from "./invoke-request/invoke-json-rpc-request";

export type DirectoryResponse = ApiResponse<DirectoryData>;

export type DirectoryParams = {
  ref_code: string;
  substring: string;
  is_active?: boolean;
};

const DICTIONARIES = "/api/dictionaries";

export const directoryApi = {
  selectValuesFromDirectory(
    params: DirectoryParams,
  ): Promise<DirectoryResponse> {
    return invokeJsonRpcRequest(DICTIONARIES, "directory-get-value", params);
  },

  // TODO 07.06.2022 Диаграмма в разработке
  showDictionary(params: {
    filter_data: {
      name?: string;
      business_code?: string;
      is_deleted?: boolean;
      created_from?: string;
      created_to?: string;
      updated_from?: string;
      updated_to?: string;
      key_word?: string;
    };
    type_id: string;
  }): Promise<unknown> {
    return invokeJsonRpcRequest(DICTIONARIES, "dictionaries-show", params);
  },
};
