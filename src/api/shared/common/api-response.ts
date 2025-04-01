import { ResponseStatus } from "./response-status.enum";
import { ScreenCode } from "./screen-code.enum";
import { BadAttributesMap } from "./bad-attributes-map";
import { ScreenData } from "./screen-data";
import { FilterData } from "./filter-data";
import { DeltaAction } from "./delta-action.enum";
import { ResponseData } from "./response-data";
import { Delta } from "./delta";

export interface ApiResponse<
  DATA extends ResponseData<DATA> = ResponseData<unknown>,
> {
  response: ResponseStatus;
  code: number | null;
  message: string | null;
  inner_errors: string | null;

  modal: string | null;
  popup: string | null;

  screen: ScreenCode | null;
  screen_data: ScreenData | null;

  filter_data: FilterData | null;
  bad_attributes: BadAttributesMap | null;
  data: DATA;
  delta_action?: DeltaAction;
  delta?: Delta<DATA>;
}
