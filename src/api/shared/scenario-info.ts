import { ListItem } from "./common/list-item";

export interface ScenarioInfo<ITEM = ListItem, DATE = Date> {
  scenario_id?: string;
  campaign_id: string | null;
  base_scenario_id?: string;
  scenario_name: string | null;
  product_cd?: ITEM[] | null;
  channel_cd?: ITEM[] | null;
  start_scenario_dt?: DATE | null;
  end_scenario_dt?: DATE | null;
  plan_conversion: string | null;
  uploading_type_cd: ITEM | null;
  activity_type_cd: ITEM | null;
  segment_cd?: ITEM[] | null;
  is_model?: boolean;
  model_cd?: ITEM[] | null;
  status_updated?: DATE;
  scenario_status?: string;
  updated_by?: string;
  sas_camp_code?: string;
}

export type ScenarioInfoModel = ScenarioInfo<string, string>;

export type ScenarioInfoViewModel = ScenarioInfo<ListItem, Date>;

export type ScenarioCreateInfoFields =
  | "campaign_id"
  | "scenario_name"
  | "product_cd"
  | "channel_cd"
  | "activity_type_cd"
  | "start_scenario_dt"
  | "end_scenario_dt"
  | "plan_conversion"
  | "uploading_type_cd"
  | "segment_cd"
  | "is_model"
  | "model_cd";
export type ScenarioCreateInfoModel = Pick<
  ScenarioInfoModel,
  ScenarioCreateInfoFields
>;
export type ScenarioCreateInfoViewModel = Pick<
  ScenarioInfoViewModel,
  ScenarioCreateInfoFields
>;

export type ScenarioEditInfoFields =
  | "scenario_id"
  | "base_scenario_id"
  | "campaign_id"
  | "product_cd"
  | "channel_cd"
  | "start_scenario_dt"
  | "end_scenario_dt"
  | "segment_cd"
  | "is_model"
  | "model_cd";
export type ScenarioEditInfoModel = Pick<
  ScenarioInfoModel,
  ScenarioEditInfoFields
>;
export type ScenarioEditInfoViewModel = Pick<
  ScenarioInfoViewModel,
  ScenarioEditInfoFields
>;
