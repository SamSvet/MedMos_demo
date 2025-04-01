import { useCallback, useEffect, useState } from "react";
import { OrderBadAttributes } from "../../../../api/shared/order-bad-attributes";
import { OrderAttrError } from "../interfaces/order-errors";
import {
  OrdersField,
  OrdersFieldFile,
  PositionField,
} from "../../../../api/shared/mappers/orders-interfaces";
import { PositionAttrError } from "../interfaces/position-errors";

export const useOrderValidation = (
  bad_attributes: OrderBadAttributes | null,
) => {
  const [orderErrors, setOrderErros] = useState<OrderAttrError | null>(null);
  const [positionsErrors, setPositionsErrors] = useState<Map<
    string,
    PositionAttrError
  > | null>(null);

  useEffect(() => {
    const orderErr: OrderAttrError = {};
    const positionsErr = new Map<string, PositionAttrError>();

    if (bad_attributes) {
      Object.entries(bad_attributes.orders?.[0] || {}).forEach(
        ([fieldName, errorData]) => {
          if (fieldName === "order_id") {
            return;
          }
          const errData: string[] | undefined =
            errorData && !Array.isArray(errorData)
              ? [errorData]
              : (errorData as string[]);

          orderErr[fieldName as OrdersField] = {
            isError: Boolean(errData && errData.length),
            errorText:
              errData && errData.length ? errData.join("; ") : undefined,
          };
        },
      );

      bad_attributes?.positions?.forEach((position) => {
        const positionErr: PositionAttrError = {};

        Object.entries(position || {}).forEach(([fieldName, errorData]) => {
          if (fieldName === "position_id") {
            return;
          }
          const errData: string[] | undefined =
            errorData && !Array.isArray(errorData)
              ? [errorData]
              : (errorData as string[]);

          positionErr[fieldName as PositionField] = {
            isError: Boolean(errData && errData.length),
            errorText:
              errData && errData.length ? errData.join("; ") : undefined,
          };
        });

        positionsErr.set(String(position.position_id), positionErr);
      });
    }

    setOrderErros(orderErr);
    setPositionsErrors(positionsErr);
  }, [bad_attributes]);

  const unsetOrderError = useCallback(
    (fieldName: OrdersFieldFile) => {
      const newErrors = { ...orderErrors, [fieldName]: { isError: false } };
      setOrderErros(newErrors);
    },
    [orderErrors],
  );

  return {
    badAttributes: bad_attributes,
    orderErrors,
    positionsErrors,
    unsetOrderError,
  };
};
