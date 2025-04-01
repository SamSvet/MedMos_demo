export interface CommonListItem {
  internal_code: string;
  name: string;
  is_deleted: boolean;
}

export interface ListItem extends CommonListItem {
  description?: string;
}
