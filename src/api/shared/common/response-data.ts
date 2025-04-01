export type DataItem<T> = T[];
export type ResponseData<D> = {
  [key in keyof D]: DataItem<unknown>;
};
