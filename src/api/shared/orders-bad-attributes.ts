export type BadAttributesType<T> = { [key in keyof T]?: string[] };
