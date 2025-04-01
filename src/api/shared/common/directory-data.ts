import { DataItem } from "./response-data";
import { ListItem } from "./list-item";

export interface DirectoryData {
  [ref_code: string]: DataItem<ListItem>;
}
