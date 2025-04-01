import { CommonDataState, createCommonDataSlice } from "./common/common-data";
import { OrdersFilterDataModel } from "../../api/shared/orders-filter-data";

export interface PositionListDataState extends CommonDataState {
  filter_data: OrdersFilterDataModel;
}

export const positionsListData = createCommonDataSlice<PositionListDataState>({
  name: "positionListData",
});
