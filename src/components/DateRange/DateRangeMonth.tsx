import * as React from "react";
import { Paper, Grid, Typography, PaperProps, styled } from "@mui/material";
import {
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
} from "date-fns";
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
} from "./DateRange.utils";
import { DateRangeHeader } from "./DateRangeHeader";
import { DateRangeDay } from "./DateRangeDay";
import { NavigationAction, DateRange } from "./DateRange.types";
import { useTranslation } from "react-i18next";

// const styles: Styles<any, any> = (theme: Theme) =>
//   createStyles({
//     root: {
//       width: 290,
//       backgroundColor: theme.palette.mode === "dark" ? "#424242" : undefined,
//     },
//     weekDaysContainer: {
//       marginTop: 10,
//       paddingLeft: 30,
//       paddingRight: 30,
//       justifyContent: "space-around",
//     },
//     daysContainer: {
//       paddingLeft: 15,
//       paddingRight: 15,
//       marginTop: 15,
//       marginBottom: 20,
//     },
//     daysRowContainer: {
//       marginTop: 1,
//       marginBottom: 1,
//     },
//   });

// interface MonthProps extends WithStyles<typeof styles> {
//   value: Date;
//   marker: symbol;
//   dateRange: DateRange;
//   minDate: Date;
//   maxDate: Date;
//   navState: [boolean, boolean];
//   setValue: (date: Date) => void;
//   helpers: {
//     inHoverRange: (day: Date) => boolean;
//   };
//   handlers: {
//     onDayClick: (day: Date) => void;
//     onDayHover: (day: Date) => void;
//     onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
//   };
// }

const MonthPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  width: 290,
  backgroundColor: theme.palette.mode === "dark" ? "#424242" : undefined,
}));

interface MonthProps {
  value: Date;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

export const DateRangeMonth: React.FunctionComponent<MonthProps> = (props) => {
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
  } = props;

  const [back, forward] = props.navState;
  const { t, i18n } = useTranslation();
  const WEEK_DAYS = React.useMemo(() => {
    if (i18n.language !== "ru") {
      return [
        t("weekday.sunday.short"),
        t("weekday.monday.short"),
        t("weekday.tuesday.short"),
        t("weekday.wednsday.short"),
        t("weekday.thursday.short"),
        t("weekday.friday.short"),
        t("weekday.saturday.short"),
      ];
    }
    return [
      t("weekday.monday.short"),
      t("weekday.tuesday.short"),
      t("weekday.wednsday.short"),
      t("weekday.thursday.short"),
      t("weekday.friday.short"),
      t("weekday.saturday.short"),
      t("weekday.sunday.short"),
    ];
  }, [i18n.language, t]);
  return (
    <MonthPaper square elevation={0}>
      <Grid container>
        <DateRangeHeader
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Previous)
          }
          onClickNext={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Next)
          }
        />

        <Grid
          item
          container
          direction="row"
          component={"div"}
          justifyContent={"space-between"}
          paddingLeft={"30px"}
          paddingRight={"30px"}
          marginTop={"10px"}
          sx={
            {
              // marginTop: 10,
              // paddingLeft: 30,
              // paddingRight: 30,
              //justifyContent: "space-around",
            }
          }
        >
          {WEEK_DAYS.map((day) => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          component={"div"}
          sx={{
            paddingLeft: "15px",
            paddingRight: "15px",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          {chunks(getDaysInMonth(date), 7).map(
            (week: any[], idx: React.Key | null | undefined) => (
              <Grid
                key={idx}
                container
                direction="row"
                // sx={{
                //   marginTop: 1,
                //   marginBottom: 1,
                // }}
              >
                {week.map((day) => {
                  const isStart = isStartOfRange(dateRange, day);
                  const isEnd = isEndOfRange(dateRange, day);
                  const isRangeOneDay = isRangeSameDay(dateRange);
                  const highlighted =
                    inDateRange(dateRange, day) || helpers.inHoverRange(day);

                  return (
                    <DateRangeDay
                      key={format(day, "mm-dd-yyyy")}
                      filled={isStart || isEnd}
                      outlined={isToday(day)}
                      highlighted={highlighted && !isRangeOneDay}
                      disabled={
                        !isSameMonth(date, day) ||
                        !isWithinInterval(day, {
                          start: minDate,
                          end: maxDate,
                        })
                      }
                      startOfRange={isStart && !isRangeOneDay}
                      endOfRange={isEnd && !isRangeOneDay}
                      onClick={() => handlers.onDayClick(day)}
                      onHover={() => handlers.onDayHover(day)}
                      value={getDate(day)}
                    />
                  );
                })}
              </Grid>
            ),
          )}
        </Grid>
      </Grid>
    </MonthPaper>
  );
};

// export default withStyles(styles)(Month);
