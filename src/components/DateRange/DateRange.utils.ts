import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  isSameDay,
  isWithinInterval,
  toDate,
  parseISO,
  isValid,
  isSameMonth,
  addMonths,
  min,
  max,
} from "date-fns";
import { DateRange } from "./DateRange.types";
import { ru } from "date-fns/locale";

export const identity = <T>(x: T) => x;

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size),
  );
};

export const combine = (...args: any[]): string =>
  args.filter(identity).join(" ");

// Date
export const getDaysInMonth = (date: Date, locale: Locale = ru) => {
  const startWeek = startOfWeek(startOfMonth(date), { locale: locale });
  const endWeek = endOfWeek(endOfMonth(date), { locale: locale });
  const days = [];
  for (let curr = startWeek; isBefore(curr, endWeek); ) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

export const isStartOfRange = ({ startDate }: DateRange, day: Date) =>
  (startDate && isSameDay(day, startDate)) as boolean;

export const isEndOfRange = ({ endDate }: DateRange, day: Date) =>
  (endDate && isSameDay(day, endDate)) as boolean;

export const inDateRange = ({ startDate, endDate }: DateRange, day: Date) =>
  (startDate &&
    endDate &&
    (isWithinInterval(day, {
      start: startDate,
      end: endDate,
    }) ||
      isSameDay(day, startDate) ||
      isSameDay(day, endDate))) as boolean;

export const isRangeSameDay = ({ startDate, endDate }: DateRange) => {
  if (startDate && endDate) {
    return isSameDay(startDate, endDate);
  }
  return false;
};

type Falsy = false | null | undefined | 0 | "";

export const parseOptionalDate = (
  date: Date | string | Falsy,
  defaultValue: Date,
) => {
  if (date instanceof Date) {
    const parsed = toDate(date);
    if (isValid(parsed)) return parsed;
  }

  if (date instanceof String) {
    const parsed = parseISO(date as string);
    if (isValid(parsed)) return parsed;
  }

  return defaultValue;
};

export const getValidatedMonths = (
  range: DateRange,
  minDate: Date,
  maxDate: Date,
) => {
  const { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ];
  }
  return [startDate, endDate];
};

export const FormatDateForInput = (
  date: Date | null | undefined,
  format = "mm.dd.yyyy",
) => {
  //Date -> mm/dd/yyyy
  if (date) {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    return `${(dd < 10 ? "0" : "") + dd}.${(mm < 10 ? "0" : "") + mm}.${date.getFullYear()}`;
  }
  return "";
};

export const maskDateFormatter = (
  value: string,
  mask: string,
  maskInputChar = "_",
) => {
  const acceptRegexp = /[\d]/gi;
  return value
    .split("")
    .map((char, i) => {
      acceptRegexp.lastIndex = 0;

      if (i > mask.length - 1) {
        return "";
      }

      const maskChar = mask[i];
      const nextMaskChar = mask[i + 1];

      const acceptedChar = acceptRegexp.test(char) ? char : "";
      const formattedChar =
        maskChar === maskInputChar ? acceptedChar : maskChar + acceptedChar;

      if (
        i === value.length - 1 &&
        nextMaskChar &&
        nextMaskChar !== maskInputChar
      ) {
        // add / after num input
        return formattedChar ? formattedChar + nextMaskChar : "";
      }

      return formattedChar;
    })
    .join("");
};
