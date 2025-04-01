import { useEffect, useRef } from "react";

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
export default usePrevious;

export const usePrevious2 = <T>(value: T) => {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T>();
  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }
  return previousRef.current;
};
