import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SCREEN_DATA_DEFAULT } from "../../../../constants/sd-fd";
import { getAdditionalOrderListData } from "../../../../selectors/orders/order-list-selectors";
import {
  useOrdersDispatch,
  useOrdersSelector,
} from "../../../../store/orders-store";
import { ordersDispatcher } from "../../../../store/thunks/orders-dispatcher";

export const useBackToList = () => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();
  const { screen_data, filter_data } = useOrdersSelector(
    getAdditionalOrderListData,
  );

  const backToList = useCallback(() => {
    dispatch(
      ordersDispatcher
        .withNavigate(navigate)
        .withScreenData({
          page: screen_data?.page || SCREEN_DATA_DEFAULT.page,
          count: screen_data?.count || SCREEN_DATA_DEFAULT.count,
        })
        .withFilterData(filter_data)
        .list(),
    );
  }, [dispatch, filter_data, navigate, screen_data?.count, screen_data?.page]);

  return backToList;
};
