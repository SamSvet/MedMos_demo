/* eslint-disable @typescript-eslint/no-explicit-any */
export const eliminateIfEmptyArr = (value?: any[]) => {
  if (value && value.length === 0) {
    return;
  }
  return value;
};

export const eliminateIfEmptyObj = <T extends { [key: string]: any }>(
  obj?: T
): T | null => {
  if (!obj) {
    return null;
  }
  const res: T = {} as T;
  let isEmpty = true;
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      const innerArray = eliminateIfEmptyArr(obj[key] as any[]);
      if (innerArray) {
        res[key] = innerArray as any;
        isEmpty = false;
      }
      continue;
    }

    if (typeof obj[key] === "object") {
      const innerObj = eliminateIfEmptyObj(obj[key]);
      if (innerObj) {
        res[key] = innerObj;
        isEmpty = false;
      }
      continue;
    }

    if (obj[key]) {
      res[key] = obj[key];
      isEmpty = false;
    }
  }
  return isEmpty ? null : res;
};
