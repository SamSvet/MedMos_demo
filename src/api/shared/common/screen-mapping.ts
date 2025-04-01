import { ScreenCode } from "./screen-code.enum";

export const SCREEN_MAPPING: { [key in ScreenCode]: string } = {
  [ScreenCode.ORDERS_VIEW]: "/orders-view", // список заказов плашки
  [ScreenCode.ORDERS_LIST]: "/orders", // список заказов
  [ScreenCode.ORDERS_CREATE]: "/orders/create", // создание нового заказа
  // eslint-disable-next-line no-template-curly-in-string
  [ScreenCode.ORDERS_SHOW]: "/orders/${order_id}", // редактирование позиций заказа
  // eslint-disable-next-line no-template-curly-in-string
  [ScreenCode.ORDERS_EDIT]: "/orders/${order_id}/edit", // редактирование заказа
  // eslint-disable-next-line no-template-curly-in-string
  [ScreenCode.POSITIONS_LIST]: "/orders/${order_id}/positions/${position_id}", // детальный список позиций заказа
  // eslint-disable-next-line no-template-curly-in-string
  [ScreenCode.POSITIONS_CREATE]: "/orders/${order_id}/positions/create",
  // eslint-disable-next-line no-template-curly-in-string
  [ScreenCode.POSITIONS_EDIT]:
    // eslint-disable-next-line no-template-curly-in-string
    "/orders/${order_id}/positions/${position_id}/edit",
  [ScreenCode.POSITIONS_RESERVE]:
    // eslint-disable-next-line no-template-curly-in-string
    "/orders/${order_id}/positions/${position_id}/reserve",
};
