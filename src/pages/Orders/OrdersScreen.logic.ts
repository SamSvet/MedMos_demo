import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersFilterDataViewModel } from "../../api/shared/orders-filter-data";
import { ScreenData } from "../../api/shared/common/screen-data";
import { orderFiltersViewModelToModel } from "../../api/shared/mappers/order-list-mappers";
import { useOrdersDispatch } from "../../store/orders-store";
import { ordersDispatcher } from "../../store/thunks/orders-dispatcher";

export const useOrderScreensLogic = (
  currScreenData: ScreenData,
  currFilterData: OrdersFilterDataViewModel,
) => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();

  const showCreateOrder = useCallback(
    () => dispatch(ordersDispatcher.withNavigate(navigate).showCreate()),
    [dispatch, navigate],
  );

  const viewOrder = useCallback(
    (id: string) =>
      dispatch(
        ordersDispatcher
          .withNavigate(navigate)
          .withScreenData(currScreenData)
          .withFilterData({
            ...(currFilterData && orderFiltersViewModelToModel(currFilterData)),
            ordering: currFilterData?.ordering,
          })
          .show({
            orders: { order_id: id },
          }),
      ),
    [currFilterData, currScreenData, dispatch, navigate],
  );

  const showEditOrder = useCallback(
    (id: string) =>
      dispatch(
        ordersDispatcher
          .withNavigate(navigate)
          .withScreenData(currScreenData)
          .withFilterData({
            ...(currFilterData && orderFiltersViewModelToModel(currFilterData)),
            ordering: currFilterData?.ordering,
          })
          .showEdit({
            orders: { order_id: id },
          }),
      ),
    [currFilterData, currScreenData, dispatch, navigate],
  );

  return { viewOrder, showEditOrder, showCreateOrder };
};
