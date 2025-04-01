export interface DictionariesFilterData<DATETYPE = string> {
  name?: string;
  business_code?: string;
  created_from?: DATETYPE;
  created_to?: DATETYPE;
  updated_from?: DATETYPE;
  updated_to?: DATETYPE;
  is_deleted?: boolean;
  key_word?: string;
}
