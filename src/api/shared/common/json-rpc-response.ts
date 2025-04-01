export interface JsonRpcResponse<RESULT> {
  jsonrpc: string;
  id: string;
  result: RESULT;
}
