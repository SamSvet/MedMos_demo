export const getValueFromRange = (val: number, range: number[]): number => {
  if (range.length > 0) {
    return range.reduce((prev, curr) => {
      return val > prev ? curr : prev;
    });
  }
  return val;
};
