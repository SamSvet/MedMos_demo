import { DataItem } from "./response-data";

export interface ContainerItem {
  id: string;
  name: string;
  plan_delivery_dt: string | null;
}

// export interface ContainerItem {
//   id: string;
//   capacity: number;
// }

export interface ContainersData {
  containers?: DataItem<ContainerItem>;
}

// export interface CommonListItem {
//   internal_code: string;
//   name: string;
//   is_deleted: boolean;
// }

// export interface ListItem extends CommonListItem {
//   description?: string;
// }
