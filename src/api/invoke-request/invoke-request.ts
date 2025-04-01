import { JsonRpcResponse } from "../shared/common/json-rpc-response";
import { LocalError } from "./local-error";

export type UploadPromise<T> = Promise<T> & { abort: () => void };

export const upload = <T>(
  file: File,
  url: string,
  options?: { onProgress?: (progress: number) => void },
): UploadPromise<T> => {
  // Вытащили xhr из Promise, чтобы прокинуть abort
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  const onProgress = options?.onProgress;

  const promise = new Promise((resolve, reject) => {
    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      onProgress?.(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status === 200) resolve(xhr.response);
      else reject(xhr.response);
    };

    const myData = new FormData();
    myData.append("resource", file);

    xhr.send(myData);
  }) as UploadPromise<T>;

  // Присвоили свойство abort, которое прервет запрос
  promise.abort = () => xhr.abort();

  return promise;
};

export const invokeRequest = async <REQUEST, RESPONSE>(
  url: string,
  payload?: REQUEST,
  makeResult?: (response: Response) => Promise<JsonRpcResponse<RESPONSE>>,
  additionalHeaders?: Headers,
): Promise<RESPONSE> => {
  const method = "POST";
  const headers = new Headers(additionalHeaders);

  let body;
  if (payload instanceof FormData) {
    body = payload as FormData;
  } else {
    headers.append("Content-Type", "application/json");
    body = payload ? JSON.stringify(payload) : undefined;
  }
  let response: Response | undefined = undefined;

  try {
    response = await fetch(url, {
      method,
      headers,
      body,
      credentials: "include",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new LocalError(
        `${response.status} ${response.statusText}`,
        response,
      );
    }

    let result;
    if (makeResult) {
      result = (await makeResult(response)) as unknown as RESPONSE;
    } else {
      result = (await response.json()) as unknown as RESPONSE;
    }
    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new LocalError((e as { toString: () => string }).toString());
  }
};
