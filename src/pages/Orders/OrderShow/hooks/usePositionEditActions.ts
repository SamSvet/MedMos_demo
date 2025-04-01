import isEqual from "lodash.isequal";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { OrderInfoViewModel } from "../../../../api/shared/order-info";
import { ScreenCode } from "../../../../api/shared/common/screen-code.enum";
import {
  orderViewModelToModel,
  positionViewModelToModel,
} from "../../../../api/shared/mappers/order-mappers";
import {
  PositionEditInfoFields,
  PositionEditInfoModel,
  PositionInfoViewModel,
} from "../../../../api/shared/position-info";
import { getAdditionalOrderListData } from "../../../../selectors/orders/order-list-selectors";
import { getPositionEditViewData } from "../../../../selectors/orders/position-edit-selectors";
import {
  useOrdersDispatch,
  useOrdersSelector,
} from "../../../../store/orders-store";
import { synchronizePositionDelta } from "../../../../store/thunks/order-sync-delta";
import { positionsDispatcher } from "../../../../store/thunks/positions-dispatcher";
import { useGetPositionDictionaries } from "../../common/hooks/useGetPositionDictionaries";

export const usePositionEditActions = (
  order: OrderInfoViewModel,
  position: PositionInfoViewModel,
) => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();
  const getPositionDictionaries = useGetPositionDictionaries();
  const { screen_data, filter_data } = useOrdersSelector(
    getAdditionalOrderListData,
  );
  const { positions: basePositions } = useOrdersSelector(
    getPositionEditViewData,
  );

  const cancel = useCallback(() => {
    dispatch(
      positionsDispatcher.withNavigate(navigate).cancelEdit({
        orders: { order_id: order.order_id },
        screen_data,
        filter_data,
      }),
    );
  }, [order.order_id, dispatch, filter_data, navigate, screen_data]);

  const syncDelta = useCallback(() => {
    const { order: computedOrder, positions: computedPosition } =
      orderViewModelToModel(order, [position]);

    dispatch(
      synchronizePositionDelta(
        {
          orders: [computedOrder],
          positions: computedPosition || [],
          ...getPositionDictionaries(position),
        },
        ScreenCode.ORDERS_VIEW,
      ),
    );
  }, [order, dispatch, position, getPositionDictionaries]);

  const preparePosition = useCallback(
    (editedPosition: PositionInfoViewModel) => {
      const resPosition: Partial<PositionEditInfoModel> =
        positionViewModelToModel(editedPosition);

      const editFields: PositionEditInfoFields[] = [
        "position_id",
        "position_name",
        "color",
        "order_id",
        "position_description",
        "model_id",
      ];

      Object.keys(resPosition).forEach((field) => {
        if (
          !editFields.includes(field as PositionEditInfoFields) ||
          (isEqual(
            editedPosition[field as keyof PositionInfoViewModel],
            basePositions?.[0]?.[field as keyof PositionInfoViewModel],
          ) &&
            !["order_id", "position_id", "base_position_id"].includes(field))
        ) {
          delete resPosition[field as keyof PositionEditInfoModel];
        }
      });

      return resPosition;
    },
    [basePositions],
  );

  const save = useCallback(() => {
    syncDelta();

    dispatch(
      positionsDispatcher.withNavigate(navigate).update({
        orders: { base_order_id: order.order_id! },
        scenarios: preparePosition(position),
      }),
    );
  }, [
    dispatch,
    navigate,
    order.order_id,
    position,
    preparePosition,
    syncDelta,
  ]);

  return { cancel, save };
};
