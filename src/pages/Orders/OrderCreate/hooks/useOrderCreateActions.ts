import { useNavigate } from "react-router-dom";
import { OrderInfoViewModel } from "../../../../api/shared/order-info";
import {
  useOrdersDispatch,
  useOrdersSelector,
} from "../../../../store/orders-store";
import { getAdditionalOrderListData } from "../../../../selectors/orders/order-list-selectors";
import { useCallback } from "react";
import {
  orderOneViewModelToModel,
  orderViewModelToModel,
} from "../../../../api/shared/mappers/order-mappers";
import { ScreenCode } from "../../../../api/shared/common/screen-code.enum";
import { ordersDispatcher } from "../../../../store/thunks/orders-dispatcher";
import { SCREEN_DATA_DEFAULT } from "../../../../constants/sd-fd";
import { useGetOrderDictionaries } from "../../common/hooks/useGetOrderDictionaries";
import { synchronizeOrderDelta } from "../../../../store/thunks/order-sync-delta";

export const useOrderCreateActions = (
  orderInitial: OrderInfoViewModel,
  file?: File | null,
) => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();
  const getOrderDictionaries = useGetOrderDictionaries();
  const { screen_data, filter_data } = useOrdersSelector(
    getAdditionalOrderListData,
  );

  const syncDelta = useCallback(() => {
    const { order: computedOrder, positions: computedPositions } =
      orderViewModelToModel(orderInitial, []);

    dispatch(
      synchronizeOrderDelta(
        {
          orders: [computedOrder],
          positions: computedPositions,
          ...getOrderDictionaries(orderInitial, []),
        },
        ScreenCode.ORDERS_CREATE,
      ),
    );
  }, [orderInitial, dispatch, getOrderDictionaries]);

  const save = useCallback(() => {
    syncDelta();
    dispatch(
      ordersDispatcher.withNavigate(navigate).createNew({
        orders: orderOneViewModelToModel(orderInitial),
      }),
    );
  }, [syncDelta, dispatch, navigate, orderInitial]);

  const saveFile = useCallback(() => {
    if (!file) return;
    const myData = new FormData();
    myData.append("resource", file);
    dispatch(
      ordersDispatcher.withNavigate(navigate).uploadFile({
        data: myData,
      }),
    );
  }, [dispatch, file, navigate]);

  const close = useCallback(() => {
    dispatch(
      ordersDispatcher
        .withNavigate(navigate)
        .withScreenData({
          page: screen_data?.page || SCREEN_DATA_DEFAULT.page,
          count: screen_data?.count || SCREEN_DATA_DEFAULT.count,
        })
        .withFilterData(filter_data)
        .cancelCreate(),
    );
  }, [dispatch, navigate, screen_data?.page, screen_data?.count, filter_data]);

  return { save, close, saveFile };
};
