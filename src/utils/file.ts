import { MIME_TYPES } from "../constants/mime-types";
import { ProceedDataResponse } from "../store/thunks/common/dispatch-utils";
import { FileInfoData } from "./response-with-file";

export const downloadLink = (
  linkHref: string,
  fileName: string,
): Promise<unknown> => {
  return new Promise<unknown>((resolve) => {
    const link = document.createElement("a");
    link.href = linkHref;
    link.download = fileName;
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    link.dispatchEvent(clickEvent);
    setTimeout(() => {
      link.remove();
      resolve(true);
    }, 100);
  });
};

export const downloadBlob = async (blob: Blob, fileName: string) => {
  const downloadUrl = window.URL.createObjectURL(blob);
  await downloadLink(downloadUrl, fileName);
  window.URL.revokeObjectURL(downloadUrl);
};

/*
export const blobToBase64 = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export const dataURItoBlob = async (
  dataURI: string
): Promise<Blob | undefined> => {
  try {
    const res = await fetch(dataURI);
    return await res.blob();
  } catch (e) {
    window.console.log(e);
    return undefined;
  }
};
*/

export const fileProceedData = (data: FileInfoData): ProceedDataResponse => {
  downloadBlob(data.file_info.file, data.file_info.fileName);
  return {
    proceedNext: false,
  };
};

export const isFileTypeCorrect = (file: File, ...mimeTypes: string[]) => {
  const fileProperties = Object.entries(MIME_TYPES).filter(([, mt]) =>
    mimeTypes.includes(mt),
  );
  const name = file.name.trim();
  const [fileType] = name.split(".").slice(-1);
  return fileProperties.some(([ft, mt]) => ft === fileType && mt === file.type);
};
