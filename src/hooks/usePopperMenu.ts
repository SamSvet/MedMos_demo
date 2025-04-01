import { PopperPlacementType, PopperProps } from "@mui/material";
import { useCallback, useState, MouseEvent } from "react";

export const usePopperMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [virtualAnchorEl, setVirtualAnchorEl] =
    useState<PopperProps["anchorEl"]>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>("right");

  const onMouseLeaveHandler = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onMouseEnterHandler = useCallback((event: MouseEvent<HTMLElement>) => {
    const targetElement = event.target as HTMLElement;
    const generateGetBoundingClientRect = (x: number, y: number) => () => ({
      ...targetElement.getBoundingClientRect(),
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
      x,
      y,
    });
    const {
      y: yRect,
      height: heightRect,
      right: rightRect,
      width: widthRect,
    } = targetElement.getBoundingClientRect();
    const currentPlacement =
      rightRect - event.clientX < widthRect / 10 ? "left" : "right";

    setPlacement(currentPlacement);
    setVirtualAnchorEl({
      getBoundingClientRect: generateGetBoundingClientRect(
        event.clientX,
        yRect + heightRect / 2,
      ),
    });
    setIsVisible(true);
  }, []);

  const onPopperActionClick = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    onMouseLeaveHandler,
    onMouseEnterHandler,
    onPopperActionClick,
    virtualAnchorEl,
    placement,
  };
};
