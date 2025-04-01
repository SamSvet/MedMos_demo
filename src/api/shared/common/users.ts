import { DataItem } from "./response-data";

export interface UserItem {
  id: string;
  email_contact: string;
  phone_contact: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  is_active: boolean;
}

export interface UsersData {
  users?: DataItem<UserItem>;
}
