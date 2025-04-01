import { Directory } from "../api/shared/directory.enum";
import { DEFAULT_ROWS_PER_PAGE } from "./order-list";

export const SCREEN_DATA_DEFAULT = { page: 0, count: DEFAULT_ROWS_PER_PAGE };
export const LIST_FILTER_DATA_DEFAULT = { ordering: "-created" };
export const APPROVAL_FILTER_DATA_DEFAULT = { ordering: "-status_updated" };
export const LIST_FILTER_REF_OPTIONS_DEFAULT = {
  [Directory.COLOR]: [{ internal_code: "", name: "", is_deleted: false }],
  [Directory.MODEL]: [{ internal_code: "", name: "", is_deleted: false }],
  [Directory.STATUS]: [{ internal_code: "", name: "", is_deleted: false }],
};
