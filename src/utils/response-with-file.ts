import { nanoid } from "nanoid";
import { ResponseStatus } from "../api/shared/common/response-status.enum";
import { JsonRpcResponse } from "../api/shared/common/json-rpc-response";

export interface FileInfoData {
  file_info: {
    file: Blob;
    fileName: string;
  };
}

// const FILE_NAME_SEPARATOR = "filename=";
// const FILE_NAME_SEPARATOR_WITH_ENC = "filename*=";

const extractFileName = (disposition: string) => {
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(disposition);
  if (matches != null && matches[1]) {
    return matches[1].replace(/['"]/g, "");
  }
  return "";
};
export const responseWithFile = async (
  response: Response,
): Promise<JsonRpcResponse<never>> => {
  const contentDisposition = response.headers.get("Content-Disposition");
  let fileResponse;
  // console.log(Object.fromEntries(response.headers));
  if (contentDisposition) {
    // let fileName: string = "";
    // if (contentDisposition.includes(FILE_NAME_SEPARATOR)) {
    //   fileName = contentDisposition.split(FILE_NAME_SEPARATOR)[1].split(";")[0];
    // } else if (contentDisposition.includes(FILE_NAME_SEPARATOR_WITH_ENC)) {
    //   const encodedName = contentDisposition
    //     .split(FILE_NAME_SEPARATOR_WITH_ENC)[1]
    //     .split(";")[0];
    //   const parts = encodedName.split("'");
    //   fileName = parts[parts.length - 1];
    //   fileName = decodeURIComponent(fileName);
    // }
    // // eslint-disable-next-line
    // if (fileName.startsWith('"') && fileName.endsWith('"')) {
    //   fileName = fileName.substring(1, fileName.length - 2);
    // }
    const fileName = extractFileName(contentDisposition);
    const data: FileInfoData = {
      file_info: {
        fileName,
        file: await response.blob(),
      },
    };

    fileResponse = {
      jsonrpc: "2.0",
      id: nanoid(),
      result: {
        response: ResponseStatus.ok,
        screen: null,
        data,
        filter_data: null,
        code: null,
        message: null,
        modal: null,
        popup: null,
        inner_errors: null,
        bad_attributes: null,
        screen_data: null,
      },
    };
  } else {
    fileResponse = await response.json();
  }
  return fileResponse;
};
