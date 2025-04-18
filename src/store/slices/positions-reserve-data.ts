import { OrderBadAttributes } from "../../api/shared/order-bad-attributes";
import { CommonDataState, createCommonDataSlice } from "./common/common-data";

export interface PositionsReserveDataState extends CommonDataState {
  bad_attributes: OrderBadAttributes | null;
}
export const positionsReserveData =
  createCommonDataSlice<PositionsReserveDataState>({
    name: "positionsReserveData",
  });
