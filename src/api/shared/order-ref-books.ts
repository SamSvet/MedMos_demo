import { Directory } from "./directory.enum";
import { DataItem } from "./common/response-data";
import { ListItem } from "./common/list-item";

export type OrderRefBooks = {
  [ref_code in Directory]?: DataItem<ListItem>;
};
