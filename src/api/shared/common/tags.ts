import { DataItem } from "./response-data";

export type TagItem = {
  id: string;
  name: string;
};

export type TagsData = {
  tags?: DataItem<TagItem>;
};
