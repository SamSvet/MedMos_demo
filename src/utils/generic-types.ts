export type NonOptionalKeys<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k;
}[keyof T];

export type DictValues<T> = {
  [k in keyof T]: k;
}[keyof T];

export type StringValues<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
}[keyof T];

export type NumberValues<T> = {
  [K in keyof T]: T[K] extends number ? T[K] : never;
}[keyof T];

function t<V extends string, T extends { [key in string]: V }>(o: T): T {
  return o;
}

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type NestedKeyOf2<T, Key = keyof T> = Key extends keyof T &
  (string | number)
  ?
      | `${Key}`
      | (T[Key] extends object ? `${Key}.${NestedKeyOf2<T[Key]>}` : never)
  : never;

export type CustomGroup<T, K extends keyof T> = {
  [Key in keyof T]: Key extends K ? T[Key][] | null : T[Key];
};

// interface ObjectConstructor {
//   keys<T>(o: T): (keyof T)[];
// }
// const groupByCategory = Object.groupBy(products, product => {
//   return product.category;
// });
// type NestedKey<O extends Record<string, unknown>> = {
//   [K in Extract<keyof O, string>]: O[K] extends Array<any>
//   ? K
//   : O[K] extends Record<string, unknown>
//   ? `${K}` | `${K}.${NestedKey<O[K]>}`
//   : K
//   }[Extract<keyof O, string>];

//   ${Key}.${NestedKeyOf<ObjectType[Key]>}

// `${Key}.${NestedKeyOf<ObjectType[Key]> extends infer U extends string ? U : never}`
