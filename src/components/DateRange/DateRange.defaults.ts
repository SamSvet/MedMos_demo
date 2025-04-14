import { ru } from "date-fns/locale";
import { DefinedRange } from "./DateRange.types";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
} from "date-fns";
import { TFunction } from "i18next";

const getDefaultRanges =
  (date: Date) =>
  (t: TFunction): DefinedRange[] => {
    return [
      {
        label: t("daterange.menu.today"),
        startDate: date,
        endDate: date,
      },
      {
        label: t("daterange.menu.yesterday"),
        startDate: addDays(date, -1),
        endDate: addDays(date, -1),
      },
      {
        label: t("daterange.menu.currentWeek"),
        startDate: startOfWeek(date, { locale: ru }),
        endDate: endOfWeek(date, { locale: ru }),
      },
      {
        label: t("daterange.menu.lastWeek"),
        startDate: startOfWeek(addWeeks(date, -1), { locale: ru }),
        endDate: endOfWeek(addWeeks(date, -1), { locale: ru }),
      },
      {
        label: t("daterange.menu.last7Days"),
        startDate: addWeeks(date, -1),
        endDate: date,
      },
      {
        label: t("daterange.menu.currentMonth"),
        startDate: startOfMonth(date),
        endDate: endOfMonth(date),
      },
      {
        label: t("daterange.menu.lastMonth"),
        startDate: startOfMonth(addMonths(date, -1)),
        endDate: endOfMonth(addMonths(date, -1)),
      },
    ];
  };

export const defaultRanges = getDefaultRanges(new Date());
