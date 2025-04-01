import { DataItem } from "./response-data";

export interface TeamItem {
  code: string;
  product_code: string;
  team_name: string;
  team_description: string;
  is_deleted: boolean;
}

export interface TeamsData {
  teams?: DataItem<TeamItem>;
}
