import { NonOptionalKeys } from "../../utils/generic-types";
import { ConsumerStatusItem } from "./common/consumer-status";
import { ContainerItem } from "./common/container";

export interface ConsumerInfo<
  CONTAINERITEM = ContainerItem,
  CONSUMERSTATUS = ConsumerStatusItem,
> {
  order_id: string | null;
  produccer_id: string | null;
  consumer_id?: string;
  consumer_name: string | null;
  consumer_status: CONSUMERSTATUS | null;
  container?: CONTAINERITEM;
}

export type ConsumerInfoModel = ConsumerInfo<string, string>;

export type ConsumerInfoViewModel = ConsumerInfo<
  ContainerItem,
  ConsumerStatusItem
>;

export type ConsumerCreateInfoFields = NonOptionalKeys<ConsumerInfo>;

export type ConsumerCreateInfoModel = Pick<
  ConsumerInfoModel,
  ConsumerCreateInfoFields
>;

export type ConsumerCreateInfoViewModel = Pick<
  ConsumerInfoViewModel,
  ConsumerCreateInfoFields
>;

export type ConsumerEditInfoFields =
  | "consumer_id"
  | "produccer_id"
  | "consumer_name"
  | "container";

export type ConsumerEditInfoModel = Pick<
  ConsumerInfoModel,
  ConsumerEditInfoFields
>;

export type ConsumerEditInfoViewModel = Pick<
  ConsumerInfoViewModel,
  ConsumerEditInfoFields
>;
