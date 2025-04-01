import { createSelector } from "@reduxjs/toolkit";
import { OrdersRootState } from "../../store/orders-store";
import {
  positionListModelToModel,
  positionListModelToViewModel,
} from "../../api/shared/mappers/order-list-mappers";
import { getRefbooks } from "./order-selectors-helpers";
import { positionModelToViewModel } from "../../api/shared/mappers/order-mappers";

export const getPositionListDataState = (state: OrdersRootState) =>
  state.positionsListData;

export const getPositionList = createSelector(
  getPositionListDataState,
  (state) => {
    return {
      ...state.data,
      positions: positionListModelToModel(
        state.data.positions!,
        getRefbooks(state.data),
      ),
    };
  },
);

export const getPositionListView = createSelector(
  getPositionListDataState,
  (state) => {
    return {
      ...state.data,
      positions: positionListModelToViewModel(
        state.data.positions!,
        getRefbooks(state.data),
      ),
    };
  },
);
export const getPositionListViewSingle = createSelector(
  getPositionListDataState,
  (state) => {
    return {
      ...state.data,
      positions: [
        positionModelToViewModel(
          state.data.positions![0],
          getRefbooks(state.data),
        ),
      ],
    };
  },
);

export const getAdditionalPositionListData = createSelector(
  getPositionListDataState,
  (state) => ({
    screen_data: state.screen_data,
    filter_data: state.filter_data,
    bad_attributes: state.bad_attributes,
  }),
);
