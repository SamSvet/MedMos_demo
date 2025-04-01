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

const getDefaultRanges = (date: Date): DefinedRange[] => [
  {
    label: "Сегодня",
    startDate: date,
    endDate: date,
  },
  {
    label: "Вчера",
    startDate: addDays(date, -1),
    endDate: addDays(date, -1),
  },
  {
    label: "Текущая неделя",
    startDate: startOfWeek(date, { locale: ru }),
    endDate: endOfWeek(date, { locale: ru }),
  },
  {
    label: "Прошлая неделя",
    startDate: startOfWeek(addWeeks(date, -1), { locale: ru }),
    endDate: endOfWeek(addWeeks(date, -1), { locale: ru }),
  },
  {
    label: "Последние 7 дней",
    startDate: addWeeks(date, -1),
    endDate: date,
  },
  {
    label: "Текущий месяц",
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
  },
  {
    label: "Прошлый месяц",
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1)),
  },
];

export const defaultRanges = getDefaultRanges(new Date());
