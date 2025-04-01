import React from "react";
import { Paper, Grid, Typography, Divider, Theme, Box } from "@mui/material";
// import { WithStyles, withStyles, createStyles, Styles } from '@mui/styles';
import { format, differenceInCalendarMonths } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { DateRangeMonth } from "./DateRangeMonth";
import { DefinedRanges } from "./DefinedRanges";
import {
  DateRange,
  DefinedRange,
  Setter,
  NavigationAction,
} from "./DateRange.types";
import { MARKERS } from "./DateRangePicker";
import { ru } from "date-fns/locale";

// const styles: Styles<any, any> = (theme: Theme) =>
//   createStyles({
//     header: {
//       padding: '20px 70px',
//     },
//     headerItem: {
//       flex: 1,
//       textAlign: 'center',
//     },
//     divider: {
//       borderLeft: `1px solid ${theme.palette.action.hover}`,
//       marginBottom: 20,
//     },
//   });

// interface MenuProps extends WithStyles<typeof styles> {
//   dateRange: DateRange;
//   ranges: DefinedRange[];
//   minDate: Date;
//   maxDate: Date;
//   firstMonth: Date;
//   secondMonth: Date;
//   setFirstMonth: Setter<Date>;
//   setSecondMonth: Setter<Date>;
//   setDateRange: Setter<DateRange>;
//   helpers: {
//     inHoverRange: (day: Date) => boolean;
//   };
//   handlers: {
//     onDayClick: (day: Date) => void;
//     onDayHover: (day: Date) => void;
//     onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
//   };
// }

// const Divider = styled(Paper)<PaperProps>(({ theme }) => ({
//   width: 290,
//   backgroundColor: theme.palette.mode === "dark" ? "#424242" : undefined,
// }));

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

export const DateRangeMenu = React.forwardRef<HTMLElement, MenuProps>(
  function DateRangeMenu(props, ref) {
    const {
      ranges,
      dateRange,
      minDate,
      maxDate,
      firstMonth,
      setFirstMonth,
      secondMonth,
      setSecondMonth,
      setDateRange,
      helpers,
      handlers,
    } = props;
    const { startDate, endDate } = dateRange;
    const canNavigateCloser =
      differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
    const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
    return (
      <Box ref={ref}>
        <Paper elevation={5}>
          <Grid container direction="row" wrap="nowrap">
            <Grid>
              <Grid
                container
                sx={{ padding: "10px 40px" }}
                // className={classes.header}
                alignItems="center"
              >
                <Grid
                  item
                  sx={{
                    flex: 1,
                    textAlign: "center",
                  }}
                  // className={classes.headerItem}
                >
                  <Typography variant="subtitle1">
                    {startDate
                      ? format(startDate, "dd MMMM, yyyy", { locale: ru })
                      : "Дата начала"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    flex: 1,
                    textAlign: "center",
                  }}
                  // className={classes.headerItem}
                >
                  <ArrowRightAlt color="action" />
                </Grid>
                <Grid
                  item
                  sx={{
                    flex: 1,
                    textAlign: "center",
                  }}
                  // className={classes.headerItem}
                >
                  <Typography variant="subtitle1">
                    {endDate
                      ? format(endDate, "dd MMMM, yyyy", { locale: ru })
                      : "Дата окончания"}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container direction="row" wrap="nowrap">
                <DateRangeMonth
                  {...commonProps}
                  value={firstMonth}
                  setValue={setFirstMonth}
                  navState={[true, canNavigateCloser]}
                  marker={MARKERS.FIRST_MONTH}
                />
                <Divider orientation="vertical" flexItem />
                <DateRangeMonth
                  {...commonProps}
                  value={secondMonth}
                  setValue={setSecondMonth}
                  navState={[canNavigateCloser, true]}
                  marker={MARKERS.SECOND_MONTH}
                />
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid>
              <DefinedRanges
                selectedRange={dateRange}
                ranges={ranges}
                setRange={setDateRange}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  },
);
