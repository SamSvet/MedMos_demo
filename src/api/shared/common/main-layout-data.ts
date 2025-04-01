import { DataItem } from "./response-data";
import { CampaignInfoModel } from "../campaign-info";
import { ScenarioInfo } from "../scenario-info";
import { OrderRefBooks } from "../order-ref-books";
import { TagsData } from "./tags";
import { UsersData } from "./users";
import { TeamsData } from "./teams";
import { OrderInfoModel, OrderPosModel } from "../order-info";
import { PositionInfoModel } from "../position-info";
import { ContainersData } from "./container";

export type MainLayoutDataOld = {
  campaigns?: DataItem<CampaignInfoModel>;
  scenarios?: DataItem<ScenarioInfo<string, string>>;
} & OrderRefBooks &
  TagsData &
  UsersData &
  TeamsData;

export type MainLayoutData = {
  orders?: DataItem<OrderInfoModel>;
  positions?: DataItem<PositionInfoModel>;
  orderpos?: DataItem<OrderPosModel>;
} & OrderRefBooks &
  UsersData &
  ContainersData;
