import { useState, useEffect, useCallback } from "react";
import {
  OrderCreateInfoViewModel,
  OrderInfoViewModel,
} from "../../../../api/shared/order-info";
import { getOrderCreate } from "../../../../selectors/orders/order-create-selectors";
import { useOrdersSelector } from "../../../../store/orders-store";

export const useCreatedOrderData = () => {
  const { orders } = useOrdersSelector(getOrderCreate);

  const [order, setOrder] = useState<OrderCreateInfoViewModel>(orders[0]);

  useEffect(() => {
    setOrder(orders[0]);
  }, [orders]);

  const updateOrderInfo = useCallback(
    (updatedOrder: Partial<OrderInfoViewModel>) => {
      setOrder({ ...order, ...updatedOrder });
    },
    [order, setOrder],
  );

  return {
    order,
    setOrder,
    updateOrderInfo,
  };
};
