import { useEffect } from "react";
import { useOrdersDispatch } from "../store/orders-store";
import { ordersDispatcher } from "../store/thunks/orders-dispatcher";
import {
  LIST_FILTER_DATA_DEFAULT,
  SCREEN_DATA_DEFAULT,
} from "../constants/sd-fd";
import { useStableNavigate } from "./useStableNavigate";
import { orderListData } from "../store/slices/order-list-data";
import { positionsDispatcher } from "../store/thunks/positions-dispatcher";

export const useInitialRequest = () => {
  const dispatch = useOrdersDispatch();
  const navigate = useStableNavigate();

  useEffect(() => {
    const { pathname } = window.location;
    const [basePath, ...other] = pathname.split("/").slice(1);
    dispatch(
      orderListData.actions.fill({
        ...orderListData.getInitialState(),
        filter_data: LIST_FILTER_DATA_DEFAULT,
        screen_data: SCREEN_DATA_DEFAULT,
      }),
    );

    const orderEdit = async (order_id: string) => {
      await dispatch(
        ordersDispatcher
          .withNavigate(navigate)
          .showEdit({ orders: { order_id } }),
      );
    };

    switch (basePath) {
      case "orders":
        dispatch(
          ordersDispatcher
            .withNavigate(navigate)
            .withScreenData(SCREEN_DATA_DEFAULT)
            .withFilterData(LIST_FILTER_DATA_DEFAULT)
            .list(),
        );
        if (!!other.length && other[0] === "create") {
          dispatch(ordersDispatcher.withNavigate(navigate).showCreate());
        }

        break;

      // case "campaigns-edit": {
      //   if (additionalPath === "scenarios-edit" && position_id) {
      //     orderEdit().then(
      //       dispatch(
      //         positionsDispatcher.withNavigate(navigate).showEdit({
      //           positions: { position_id },
      //           orders: { order_id },
      //         }),
      //       ),
      //     );
      //     break;
      //   }
      //   if (additionalPath === "scenarios-create" && position_id) {
      //     orderEdit().then(
      //       dispatch(
      //         positionsDispatcher.withNavigate(navigate).showCreate({
      //           orders: { order_id },
      //         }),
      //       ),
      //     );
      //     break;
      //   }
      //   orderEdit().catch((reason) => window.console.log(reason));
      //   break;
      // }
      // case "campaigns-create":
      //   dispatch(ordersDispatcher.withNavigate(navigate).showCreate());
      //   break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
