import { OrderBadAttributes } from "../../api/shared/order-bad-attributes";
import { CommonDataState, createCommonDataSlice } from "./common/common-data";

export interface PositionsEditDataState extends CommonDataState {
  bad_attributes: OrderBadAttributes | null;
}

export const positionsEditData = createCommonDataSlice<PositionsEditDataState>({
  name: "positionsEditData",
});
