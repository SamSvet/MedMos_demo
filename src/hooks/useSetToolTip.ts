import { RefObject, useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useOnWindowResize } from "./useOnWindowResize";

export const useSetToolTip = <T extends HTMLElement>(elem: RefObject<T>) => {
  const [open, setOpen] = useState(false);
  const [shouldRenderToolTip, setShouldRenderToolTip] =
    useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const shouldRender = useCallback(() => {
    if (elem.current && elem.current!.scrollWidth > elem.current!.clientWidth) {
      setShouldRenderToolTip(true);
    } else if (shouldRenderToolTip) {
      setShouldRenderToolTip(false);
    }
  }, [elem, shouldRenderToolTip]);

  useEffect(() => {
    if (elem.current) {
      shouldRender();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOnWindowResize(debounce(shouldRender, 1000));

  return { shouldRenderToolTip, handleClose, handleOpen, open };
};
