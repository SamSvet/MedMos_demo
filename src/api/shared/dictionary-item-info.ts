export interface DictionaryItemInfo<DATETYPE = Date> {
  name: string;
  description: string;
  business_code: string;
  created: string;
  created_by: DATETYPE;
  updated: string;
  updated_by: DATETYPE;
  is_deleted: string;
}
