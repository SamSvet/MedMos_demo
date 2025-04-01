import { useState, useEffect, useCallback } from "react";
import { OrderInfoViewModel } from "../../../../api/shared/order-info";
import { getOrderEdit } from "../../../../selectors/orders/order-edit-selectors";
import { useOrdersSelector } from "../../../../store/orders-store";

export const useEditedOrderData = () => {
  const { orders } = useOrdersSelector(getOrderEdit);

  const [order, setOrder] = useState<OrderInfoViewModel>(orders[0]);

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
