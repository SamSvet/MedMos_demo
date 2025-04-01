import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SCREEN_DATA_DEFAULT } from "../../../../constants/sd-fd";
import { fileProceedData } from "../../../../utils/file";
import {
  OrderEditInfoModel,
  OrderInfoViewModel,
} from "../../../../api/shared/order-info";
import {
  useOrdersDispatch,
  useOrdersSelector,
} from "../../../../store/orders-store";
import { getAdditionalOrderListData } from "../../../../selectors/orders/order-list-selectors";
import { ordersDispatcher } from "../../../../store/thunks/orders-dispatcher";
import { positionsDispatcher } from "../../../../store/thunks/positions-dispatcher";
import { PositionInfoViewModel } from "../../../../api/shared/position-info";
import {
  orderOneViewModelToModel,
  positionViewModelToModel,
} from "../../../../api/shared/mappers/order-mappers";

export const useOrderShowActions = (
  order: OrderInfoViewModel,
  positions: PositionInfoViewModel[],
) => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();
  const { screen_data, filter_data } = useOrdersSelector(
    getAdditionalOrderListData,
  );

  const showEdit = useCallback(() => {
    dispatch(
      ordersDispatcher
        .withNavigate(navigate)
        .withScreenData({
          page: screen_data?.page || SCREEN_DATA_DEFAULT.page,
          count: screen_data?.count || SCREEN_DATA_DEFAULT.count,
        })
        .withFilterData(filter_data)
        .showEdit({
          orders: { order_id: order.order_id! },
        }),
    );
  }, [
    dispatch,
    filter_data,
    navigate,
    order.order_id,
    screen_data?.count,
    screen_data?.page,
  ]);

  const showCreatePositions = useCallback(() => {
    dispatch(
      positionsDispatcher.withNavigate(navigate).showCreate({
        orders: orderOneViewModelToModel(order),
      }),
    );
  }, [dispatch, navigate, order]);

  const showEditPositions = useCallback(
    (position: PositionInfoViewModel) => {
      dispatch(
        positionsDispatcher.withNavigate(navigate).showEdit({
          positions: positionViewModelToModel(position),
          orders: orderOneViewModelToModel(order),
        }),
      );
    },
    [dispatch, navigate, order],
  );

  const showReservePositions = useCallback(
    (position: PositionInfoViewModel) => {
      dispatch(
        positionsDispatcher.withNavigate(navigate).showReserve({
          positions: positionViewModelToModel(position),
          orders: orderOneViewModelToModel(order),
        }),
      );
    },
    [dispatch, navigate, order],
  );

  const showPositionsList = useCallback(
    (position: PositionInfoViewModel) => {
      dispatch(
        positionsDispatcher.withNavigate(navigate).list({
          positions: positionViewModelToModel(position),
          orders: orderOneViewModelToModel(order),
        }),
      );
    },
    [dispatch, navigate, order],
  );

  const downloadPdf = useCallback(async () => {
    return dispatch(
      ordersDispatcher
        .withNavigate(navigate)
        .exportOrder({ order_id: order.order_id! }, fileProceedData),
    );
  }, [dispatch, navigate, order.order_id]);

  return {
    showEdit,
    downloadPdf,
    showCreatePositions,
    showEditPositions,
    showPositionsList,
    showReservePositions,
  };
};
