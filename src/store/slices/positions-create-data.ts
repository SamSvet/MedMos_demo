import { OrderBadAttributes } from "../../api/shared/order-bad-attributes";
import { CommonDataState, createCommonDataSlice } from "./common/common-data";

export interface PositionsCreateDataState extends CommonDataState {
  bad_attributes: OrderBadAttributes | null;
}

export const positionsCreateData =
  createCommonDataSlice<PositionsCreateDataState>({
    name: "positionsCreateData",
  });
