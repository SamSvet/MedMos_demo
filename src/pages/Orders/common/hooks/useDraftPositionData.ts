import { useState, useCallback } from "react";
import {
  PositionInfoViewModel,
  PositionInfo,
} from "../../../../api/shared/position-info";

export const useDraftPositionData = (
  basePosition?: PositionInfoViewModel | null,
) => {
  const [position, setPosition] = useState<PositionInfoViewModel>(
    (basePosition || {}) as PositionInfoViewModel,
  );

  // useEffect(() => {
  //   setPosition((basePosition || {}) as PositionInfoViewModel);
  // }, [basePosition]);

  const updatePositionInfo = useCallback(
    (updatePosition: Partial<PositionInfo>) => {
      setPosition({ ...position, ...updatePosition });
    },
    [position, setPosition],
  );

  return { position, setPosition, updatePositionInfo };
};
