import { useCallback } from "react";
import { useNavigate } from "react-router";
import { ScreenCode } from "../../../../api/shared/common/screen-code.enum";
import { positionViewModelToModel } from "../../../../api/shared/mappers/order-mappers";
import {
  PositionInfoModel,
  PositionInfoViewModel,
} from "../../../../api/shared/position-info";
import { getAdditionalOrderListData } from "../../../../selectors/orders/order-list-selectors";
import {
  useOrdersDispatch,
  useOrdersSelector,
} from "../../../../store/orders-store";
import { synchronizePositionDelta } from "../../../../store/thunks/order-sync-delta";
import { positionsDispatcher } from "../../../../store/thunks/positions-dispatcher";
import { useGetPositionDictionaries } from "../../common/hooks/useGetPositionDictionaries";

export const usePositionCreateActions = (position: PositionInfoViewModel) => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();
  const { screen_data, filter_data } = useOrdersSelector(
    getAdditionalOrderListData,
  );

  const getPositionDictionaries = useGetPositionDictionaries();

  const cancel = useCallback(() => {
    dispatch(
      positionsDispatcher.withNavigate(navigate).cancelCreate({
        orders: { order_id: position.order_id },
        screen_data,
        filter_data,
      }),
    );
  }, [dispatch, navigate, position.order_id, screen_data, filter_data]);

  const syncDelta = useCallback(() => {
    const computedPosition = {
      ...positionViewModelToModel(position),
      order_id: position.order_id,
    };

    dispatch(
      synchronizePositionDelta(
        {
          orders: [{ order_id: position.order_id as string }],
          positions: [computedPosition as PositionInfoModel],

          ...getPositionDictionaries(position),
        },
        ScreenCode.POSITIONS_CREATE,
      ),
    );
  }, [position, dispatch, getPositionDictionaries]);

  const save = useCallback(() => {
    syncDelta();
    dispatch(
      positionsDispatcher.withNavigate(navigate).create({
        positions: positionViewModelToModel({
          ...position,
          order_id: position.order_id,
        }),
      }),
    );
  }, [dispatch, navigate, position, syncDelta]);

  return { cancel, save };
};
