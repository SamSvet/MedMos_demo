import { ListItem } from "./common/list-item";
import { TagItem } from "./common/tags";
import { TeamItem } from "./common/teams";
import { UserItem } from "./common/users";

export interface CampaignInfo<
  ITEM = ListItem,
  DATE = Date,
  TAGITEM = TagItem,
  USERITEM = UserItem,
  TEAMITEM = TeamItem,
> {
  campaign_id?: string;
  base_campaign_id?: string;
  campaign_version?: number;
  campaign_name: string | null;
  campaign_kind_cd: ITEM | null; // single
  activity_group_cd: ITEM | null; // single
  campaign_manager: USERITEM | null; // single
  team_cd: TEAMITEM | null; // single
  tags: TAGITEM[] | null; // multiple
  description: string | null;
  confluence_link?: string;
  created?: DATE;
  created_by?: string | null;
  status_updated?: DATE;
  updated?: DATE;
  updated_by?: string | null;
  campaign_status_cd?: ITEM | null;
  approve_note?: string | null;
  close_reason?: string | null;
  locked_till?: DATE;
}

export type CampaignInfoModel = CampaignInfo<
  string,
  string,
  string,
  string,
  string
>;
export type CampaignInfoViewModel = CampaignInfo<
  ListItem,
  Date,
  TagItem,
  UserItem,
  TeamItem
>;

export type CampaignCreateInfoFields =
  | "campaign_name"
  | "activity_group_cd"
  | "campaign_manager"
  | "campaign_kind_cd"
  | "tags"
  | "team_cd"
  | "description";
export type CampaignCreateInfoModel = Pick<
  CampaignInfoModel,
  CampaignCreateInfoFields
>;
export type CampaignCreateInfoViewModel = Pick<
  CampaignInfoViewModel,
  CampaignCreateInfoFields
>;

export type CampaignEditInfoFields =
  | "campaign_id"
  | "campaign_manager"
  | "campaign_kind_cd"
  | "tags"
  | "team_cd"
  | "description";
export type CampaignEditInfoModel = Pick<
  CampaignInfoModel,
  CampaignEditInfoFields
>;
export type CampaignEditInfoViewModel = Pick<
  CampaignInfoViewModel,
  CampaignEditInfoFields
>;
