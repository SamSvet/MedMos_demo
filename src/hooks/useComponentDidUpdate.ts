import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
} from "react";

export const useComponentDidUpdate = (
  effect: EffectCallback,
  dependencies: DependencyList = []
) => {
  const hasMounted = useRef(false);

  const memoized = useCallback(effect, [...dependencies, effect]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    memoized();
  }, [memoized]);
};
