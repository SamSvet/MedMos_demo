import { useState, useEffect, useCallback } from "react";
import { OrderBadAttributes } from "../../../../api/shared/order-bad-attributes";
import { PositionField } from "../../../../api/shared/mappers/orders-interfaces";
import { PositionAttrError } from "../interfaces/position-errors";

export const usePositionValidation = (
  bad_attributes: OrderBadAttributes | null,
) => {
  const [positionErrors, setPositionErros] = useState<PositionAttrError | null>(
    null,
  );

  useEffect(() => {
    const res: PositionAttrError = {};

    if (bad_attributes) {
      Object.entries(bad_attributes?.positions?.[0] || {}).forEach(
        ([fieldName, errorData]) => {
          if (fieldName === "scenario_id") {
            return;
          }
          const errData: string[] | undefined =
            errorData && !Array.isArray(errorData)
              ? [errorData]
              : (errorData as string[]);

          res[fieldName as PositionField] = {
            isError: Boolean(errData && errData.length),
            errorText:
              errorData && errData.length ? errData.join("; ") : undefined,
          };
        },
      );
    }

    setPositionErros(res);
  }, [bad_attributes]);

  const unsetPositionError = useCallback(
    (fieldName: PositionField) => {
      const newErrors = { ...positionErrors, [fieldName]: { isError: false } };
      //   if (fieldName === "is_model") {
      //     setPositionErros({
      //       ...positionErrors,
      //       ["model_cd"]: { isError: false },
      //     });
      //   } else {
      //     setPositionErros(newErrors);
      //   }
      setPositionErros(newErrors);
    },
    [positionErrors],
  );

  return {
    badAttrScenario: bad_attributes,
    positionErrors,
    unsetPositionError,
  };
};
