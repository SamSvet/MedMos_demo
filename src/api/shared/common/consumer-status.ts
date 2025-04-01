import { DataItem } from "./response-data";

// export enum ConsumerStatus {
//   PRODUCTION = "production",
//   SEA = "sea",
//   RAILWAY = "railway",
//   UNLOADED = "unloaded",
// }

const ConsumerStatus = {
  PRODUCTION: "production",
  SEA: "sea",
  RAILWAY: "railway",
  UNLOADED: "unloaded",
} as const;

export type ConsumerStatusItem = {
  id: string;
  name: (typeof ConsumerStatus)[keyof typeof ConsumerStatus];
};

export type ConsumerStatusData = {
  status?: DataItem<ConsumerStatusItem>;
};
