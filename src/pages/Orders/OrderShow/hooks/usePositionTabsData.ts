import { useEffect, useMemo } from "react";
import { PositionInfoViewModel } from "../../../../api/shared/position-info";
import { getCurrentRefBooks } from "../../../../selectors/orders/common-order-selectors";
import { useOrdersSelector } from "../../../../store/orders-store";

export const usePositionTabsData = (positions?: PositionInfoViewModel[]) => {
  const { dct_status } = useOrdersSelector(getCurrentRefBooks);

  const positionsTabData = useMemo(() => {
    if (!positions || !dct_status) {
      return new Map<string, PositionInfoViewModel[]>([["Нет позиций", []]]);
    }
    return dct_status.reduce(
      (prev, cur) =>
        prev.set(
          cur.name,
          (positions || []).filter((pos) => pos.status?.name === cur.name),
        ),
      new Map<string, PositionInfoViewModel[]>(),
    );
  }, [dct_status, positions]);

  const positionsTabs = useMemo(() => {
    return Array.from(positionsTabData.keys());
  }, [positionsTabData]);

  return { positionsTabs, positionsTabData };
  // return groupBy(["position_name"])(positions);
};
