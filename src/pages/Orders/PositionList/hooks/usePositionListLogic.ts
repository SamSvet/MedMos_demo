import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useOrdersDispatch,
  useOrdersSelector,
} from "../../../../store/orders-store";
import { getOrderView } from "../../../../selectors/orders/order-view-selectors";
import {
  getAdditionalPositionListData,
  getPositionList,
} from "../../../../selectors/orders/position-list-selectors";

export const usePositionListLogic = () => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();
  const hasMounted = useRef(false);

  const { positions } = useOrdersSelector(getPositionList);
  const { orders } = useOrdersSelector(getOrderView);

  const { filter_data, screen_data } = useOrdersSelector(
    getAdditionalPositionListData,
  );

  return {
    positions,
  };
};
