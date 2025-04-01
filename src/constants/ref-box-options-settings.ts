import { ContainerItem } from "../api/shared/common/container";
import { ListItem } from "../api/shared/common/list-item";
import { TagItem } from "../api/shared/common/tags";
import { TeamItem } from "../api/shared/common/teams";
import { UserItem } from "../api/shared/common/users";
import { OptionsSettings } from "../components/RefBox";

export const REF_OPTIONS_SETINGS: OptionsSettings<ListItem> = {
  value: "name",
  key: "internal_code",
  unavailable: "is_deleted",
};

export const TAGS_OPTIONS_SETTINGS: OptionsSettings<TagItem> = {
  value: "name",
  key: "id",
};

export const USERS_OPTIONS_SETTINGS: OptionsSettings<UserItem> = {
  unavailable: (option) => !option.is_active,
  key: "id",
  value: (option) =>
    [option.last_name, option.first_name, option.middle_name]
      .filter(Boolean)
      .join(" "),
};

export const TEAMS_OPTIONS_SETTINGS: OptionsSettings<TeamItem> = {
  value: "team_name",
  key: "code",
  unavailable: "is_deleted",
};

export const CONTAINERS_OPTIONS_SETTINGS: OptionsSettings<ContainerItem> = {
  value: "name",
  key: "id",
  unavailable: (_) => false,
};

export const REQUEST_MIN_SYMBOLS_TAGS: number = 1;
export const REQUEST_MIN_SYMBOLS_USERS: number = 1;
export const REQUEST_MIN_SYMBOLS_CONTAINERS: number = 1;
