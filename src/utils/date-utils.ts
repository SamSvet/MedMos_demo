import { format, startOfDay, endOfDay } from "date-fns/fp";

const DATE_FORMAT_SEPARATOR = ".";
export const DATE_FORMAT_VIEW = `dd${DATE_FORMAT_SEPARATOR}MM${DATE_FORMAT_SEPARATOR}yyyy`;

export const strToDate = (
  dateString: string | undefined | null
): Date | undefined => {
  if (dateString) {
    return new Date(dateString.replace(/((\+|-)\d{2}:\d{2})|Z$/g, ""));
  }
};

export const dateToStr = (
  date?: Date | null,
  isEndOfDay: boolean = false
): string => {
  if (!date) {
    return "";
  }
  const convertedDate = isEndOfDay ? endOfDay(date) : startOfDay(date);
  const timeZone = "+03:00";
  const formattedDate = format("yyyy-MM-dd'T'HH:mm:ss.SSS", convertedDate);
  return formattedDate + timeZone;
};

export const formatDate = (date?: unknown): string => {
  if (!date || !(date instanceof Date)) {
    return "";
  }
  return [
    date.getDate().toString().padStart(2, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getFullYear(),
  ].join(".");
};

/*
export const setTime = (
  date: Date | null,
  hours: number,
  minutes: number,
  seconds: number,
  millisecond: number = 0
): Date | null => {
  if (!date) {
    return null;
  }

  const resDate = new Date(date);
  resDate.setHours(hours);
  resDate.setMinutes(minutes);
  resDate.setSeconds(seconds);
  resDate.setMilliseconds(millisecond);
  return resDate;
};
*/

export const dateIsValid = (
  value: string,
  separator: "/" | "." | "-" = DATE_FORMAT_SEPARATOR
) => {
  const regex = /^\d{2}(\/|-|\.)\d{2}(\/|-|\.)\d{4}$/;

  if (value.match(regex) === null) {
    return false;
  }

  const [day, month, year] = value.split(separator);
  const isoFormattedStr = `${year}-${month}-${day}`;
  const date = new Date(isoFormattedStr);
  const timestamp = date.getTime();
  if (Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(isoFormattedStr);
};
