import {
  OrdersField,
  OrdersFieldFile,
} from "../../../../api/shared/mappers/orders-interfaces";

export type OrderAttrError = {
  [key in OrdersFieldFile]?: { isError: boolean; errorText?: string };
};
