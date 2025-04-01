import { useEffect, useState } from "react";
import isEqual from "lodash.isequal";

export const useComputedDataUpdate = <P, R>(
  baseData: P,
  formatter: (baseData: P) => R,
) => {
  const [lastData, setLastData] = useState<P>(baseData);
  const [lastComputedData, setLastComputedData] = useState<R>(
    formatter(baseData),
  );

  useEffect(() => {
    if (!isEqual(lastData, baseData)) {
      setLastData(baseData);
      setLastComputedData(formatter(baseData));
    }
  }, [baseData, lastData, lastComputedData, formatter]);

  return { lastData, lastComputedData };
};
