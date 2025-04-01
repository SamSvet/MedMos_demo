import isEqual from "lodash.isequal";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  OrderEditInfoFields,
  OrderEditInfoModel,
  OrderInfoViewModel,
} from "../../../../api/shared/order-info";
import { ScreenCode } from "../../../../api/shared/common/screen-code.enum";
import {
  orderOneViewModelToModel,
  orderViewModelToModel,
} from "../../../../api/shared/mappers/order-mappers";
import { PositionInfoViewModel } from "../../../../api/shared/position-info";
import { SCREEN_DATA_DEFAULT } from "../../../../constants/sd-fd";
import { getOrderEditViewData } from "../../../../selectors/orders/order-edit-selectors";
import { getAdditionalOrderListData } from "../../../../selectors/orders/order-list-selectors";
import {
  useOrdersDispatch,
  useOrdersSelector,
} from "../../../../store/orders-store";
import { synchronizeOrderDelta } from "../../../../store/thunks/order-sync-delta";
import { ordersDispatcher } from "../../../../store/thunks/orders-dispatcher";
import { positionsDispatcher } from "../../../../store/thunks/positions-dispatcher";
import { useGetOrderDictionaries } from "../../common/hooks/useGetOrderDictionaries";

export const useOrderEditActions = (
  order: OrderInfoViewModel,
  positions: PositionInfoViewModel[],
) => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();
  const getOrderDictionaries = useGetOrderDictionaries();
  const { screen_data, filter_data } = useOrdersSelector(
    getAdditionalOrderListData,
  );
  const { orders: baseOrders } = useOrdersSelector(getOrderEditViewData);

  const syncDelta = useCallback(() => {
    const { order: computedOrder, positions: computedPositions } =
      orderViewModelToModel(order, positions);

    dispatch(
      synchronizeOrderDelta(
        {
          orders: [computedOrder],
          positions: computedPositions,
          ...getOrderDictionaries(order, positions),
        },
        ScreenCode.ORDERS_EDIT,
      ),
    );
  }, [order, positions, dispatch, getOrderDictionaries]);

  const prepareOrder = useCallback(
    (editedOrder: Partial<OrderInfoViewModel>) => {
      const resOrder: Partial<OrderEditInfoModel> =
        orderOneViewModelToModel(editedOrder);

      const editFields: OrderEditInfoFields[] = [
        "order_name",
        "order_id",
        "order_manager",
        "description",
      ];

      Object.keys(resOrder).forEach((field) => {
        if (
          !editFields.includes(field as OrderEditInfoFields) ||
          (isEqual(
            editedOrder[field as keyof OrderInfoViewModel],
            baseOrders?.[0]?.[field as keyof OrderInfoViewModel],
          ) &&
            field !== "order_id")
        ) {
          delete resOrder[field as keyof OrderEditInfoModel];
        }
      });

      return resOrder;
    },
    [baseOrders],
  );

  const sendEditedOrderToApprove = useCallback(() => {
    syncDelta();
    dispatch(
      ordersDispatcher.withNavigate(navigate).updateApprove({
        orders: prepareOrder(order),
      }),
    );
  }, [syncDelta, dispatch, navigate, prepareOrder, order]);

  const save = useCallback(() => {
    syncDelta();

    dispatch(
      ordersDispatcher.withNavigate(navigate).update({
        orders: prepareOrder(order),
      }),
    );
  }, [syncDelta, dispatch, navigate, prepareOrder, order]);

  const showCreatePositions = useCallback(() => {
    syncDelta();

    dispatch(
      positionsDispatcher.withNavigate(navigate).showCreate({
        orders: prepareOrder(order),
      }),
    );
  }, [syncDelta, dispatch, navigate, prepareOrder, order]);

  const showEditPositions = useCallback(
    (positionId: string) => {
      syncDelta();

      dispatch(
        positionsDispatcher.withNavigate(navigate).showEdit({
          positions: { base_position_id: positionId },
          orders: prepareOrder(order),
        }),
      );
    },
    [syncDelta, dispatch, navigate, prepareOrder, order],
  );

  const deletePosition = useCallback(
    (positionId: string) => {
      syncDelta();

      dispatch(
        positionsDispatcher.withNavigate(navigate).delete({
          positions: { base_position_id: positionId },
          orders: prepareOrder(order),
        }),
      );
    },
    [syncDelta, dispatch, navigate, prepareOrder, order],
  );

  const close = useCallback(() => {
    dispatch(
      ordersDispatcher
        .withNavigate(navigate)
        .withScreenData({
          page: screen_data?.page || SCREEN_DATA_DEFAULT.page,
          count: screen_data?.count || SCREEN_DATA_DEFAULT.count,
        })
        .withFilterData(filter_data)
        .cancelEdit({
          orders: { order_id: order.order_id! },
        }),
    );
  }, [
    dispatch,
    navigate,
    screen_data?.page,
    screen_data?.count,
    filter_data,
    order,
  ]);

  return {
    sendEditedOrderToApprove,
    save,
    showCreatePositions,
    showEditPositions,
    deletePosition,
    close,
  };
};
