import { useEffect, useRef } from "react";

export const useOnWindowResize = (callback: () => void) => {
  const listener = useRef(false);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener("resize", callback);
    }
    listener.current = true;
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [callback]);
};
