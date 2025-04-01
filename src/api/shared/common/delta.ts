import { DataItem, ResponseData } from "./response-data";

export type DeltaField<Item, Field extends DataItem<Item>> = Field extends [
  Item,
]
  ? [Partial<Field[number]>]
  : Field;

export type Delta<T extends ResponseData<T>> = {
  [key in keyof T]: DeltaField<T[key][number], T[key]>;
};
