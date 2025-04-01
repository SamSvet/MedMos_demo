import {
  Grid,
  Box,
  TextField,
  ClickAwayListener,
  Zoom,
  Fade,
  Grow,
  Popper,
  Popover,
  Paper,
  GrowProps,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { makeStyles, createStyles } from "@mui/styles";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import {
  addMonths,
  addYears,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  max,
  min,
} from "date-fns";
import { DateRange, DefinedRange, NavigationAction } from "./DateRange.types";
import {
  FormatDateForInput,
  getValidatedMonths,
  maskDateFormatter,
  parseOptionalDate,
} from "./DateRange.utils";
import { defaultRanges } from "./DateRange.defaults";
import { DateRangeMenu } from "./DateRangeMenu";

type Marker = symbol;

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol("firstMonth"),
  SECOND_MONTH: Symbol("secondMonth"),
};

interface DateRangeInputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  readonly?: boolean;
}
interface DateRangeEditorProps {
  dateRange: DateRange;
  onChange: (dateRange: DateRange) => void;
  mask?: string;
  dateInputDelimeter?: string;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  inputVariant?: "filled" | "outlined" | "standart";
  startInput?: DateRangeInputProps;
  endInput?: DateRangeInputProps;
}

// const useStyles = makeStyles(() =>
//   createStyles({
//     btnStyle: {
//       margin: "1em",
//       alignItems: "center",
//       minWidth: 150,
//     },
//     formFieldStyle: {
//       margin: "1em",
//       minWidth: 180,
//     },
//   }),
// );

export const DateRangeEditor: React.FC<DateRangeEditorProps> = (props) => {
  const today = new Date();

  const {
    dateRange,
    onChange,
    minDate,
    maxDate,
    definedRanges = defaultRanges,
    mask = "__.__.____",
    dateInputDelimeter = ".",
    startInput,
    endInput,
  } = props;

  const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
  const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
    dateRange || {},
    minDateValid,
    maxDateValid,
  );
  const [daterange, setDaterange] = React.useState<DateRange>({ ...dateRange });
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [firstMonth, setFirstMonth] = React.useState<Date>(
    intialFirstMonth || today,
  );
  const [secondMonth, setSecondMonth] = React.useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1),
  );

  const [openDateRangePicker, setOpenDateRangePicker] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const anchorRef = React.useRef<HTMLElement>();
  const isOpen = Boolean(anchorEl);

  // useEffect(() => {
  //   console.log(anchorRef);
  // }, [anchorRef]);

  const [dateFrom, setDateFrom] = useState(
    FormatDateForInput(dateRange.startDate),
  );
  const [dateTo, setDateTo] = useState(FormatDateForInput(dateRange.endDate));
  const [dateFromValidation, setDateFromValidation] = useState("");
  const [dateToValidation, setDateToValidation] = useState("");

  const { startDate, endDate } = daterange;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeDateRangePicker = (event: Event | React.SyntheticEvent) => {
    //console.log(event.target);
    // if (event.target.localName === "body") {
    //   return;
    // }
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenDateRangePicker(false);
  };

  const onModelUpdate = (newValue: DateRange, dispatch = true) => {
    setDaterange(newValue);
    const dfrom = FormatDateForInput(newValue.startDate);
    const dto = FormatDateForInput(newValue.endDate);
    setDateFrom(() => dfrom);
    setDateTo(() => dto);
    setDateFromValidation(() => (dfrom.length < 1 ? "Required" : ""));
    setDateToValidation(() => (dto.length < 1 ? "Required" : ""));

    dispatch && onChange(newValue);
  };

  const parseFromDate = (event: any) => {
    const newValue = event.target.value;
    const pdate = isDateValue(newValue);
    const newmodel: DateRange = { startDate: undefined, endDate };
    if (pdate && (!endDate || pdate < endDate)) {
      newmodel.startDate = pdate;
      setFirstMonthValidated(pdate);
      endDate &&
        setSecondMonthValidated(
          isSameMonth(pdate, endDate) ? addMonths(pdate, 1) : endDate,
        );
      setDateFromValidation("");
    } else {
      setDateFromValidation(
        newValue.length < 1 ? "Required" : "Please enter valid Date",
      );
    }
    setDateFrom(maskDateFormatter(newValue, mask));
    setDaterange(newmodel);
    onChange(newmodel);
  };
  const parseToDate = (event: any) => {
    const newValue = event.target.value;
    const pdate = isDateValue(newValue);
    const newmodel: DateRange = { startDate, endDate: undefined };
    if (pdate && startDate && pdate > startDate) {
      newmodel.endDate = pdate;
      setSecondMonthValidated(pdate);
      startDate &&
        setFirstMonthValidated(
          isSameMonth(pdate, startDate) ? addMonths(pdate, -1) : startDate,
        );
      setDateToValidation("");
    } else {
      setDateToValidation(
        newValue.length < 1 ? "Required" : "Please enter valid Date",
      );
    }
    setDateTo(maskDateFormatter(newValue, mask));
    setDaterange(newmodel);
    onChange(newmodel);
  };

  const isDateValue = (newValue: string) => {
    const dvals = newValue.split(dateInputDelimeter);
    if (newValue.length === mask.length && dvals.length > 2) {
      const today = new Date();
      const dt = new Date(
        parseInt(dvals[2], 10),
        parseInt(dvals[1], 10) - 1,
        parseInt(dvals[0], 10),
      );
      if (dt && dt > minDateValid && dt < maxDateValid) {
        return dt;
      }
    }
    return null;
  };

  // handlers
  const setFirstMonthValidated = (date: Date) => {
    if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date: Date) => {
    if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const setDateRangeValidated = (range: DateRange) => {
    let { startDate: newStart, endDate: newEnd } = range;

    if (newStart && newEnd) {
      range.startDate = newStart = max([newStart, minDateValid]);
      range.endDate = newEnd = min([newEnd, maxDateValid]);

      onModelUpdate(range);

      setFirstMonth(newStart);
      setSecondMonth(
        isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
      );
    } else {
      const emptyRange = {};

      onModelUpdate(emptyRange);

      setFirstMonth(today);
      setSecondMonth(addMonths(firstMonth, 1));
    }
  };

  const onDayClick = (day: Date) => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      const newRange = { startDate, endDate: day };
      onModelUpdate(newRange);
    } else {
      //onModelUpdate({ startDate: day, endDate: undefined }, false);
      onModelUpdate({ startDate: day, endDate: undefined }, true);
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date: Date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const inHoverRange = (day: Date) =>
    (startDate &&
      !endDate &&
      hoverDay &&
      isAfter(hoverDay, startDate) &&
      isWithinInterval(day, {
        start: startDate,
        end: hoverDay,
      })) as boolean;

  const helpers = {
    inHoverRange,
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate,
  };

  const inputFieldClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // setOpenDateRangePicker((prevState) => !prevState);
    setOpenDateRangePicker(true);
  };
  //   const classes = useStyles();

  const clearDate = useCallback(
    (dateRangeKey: keyof DateRange) => (event: React.SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onModelUpdate({ ...daterange, [dateRangeKey]: undefined }, true);
    },
    [daterange, onModelUpdate],
  );

  return (
    <Box ref={anchorRef}>
      <Grid style={{ display: "flex", alignItems: "center" }}>
        <TextField
          //   className={classes.formFieldStyle}
          size="small"
          label={startInput?.label}
          name="dateFrom"
          // inputProps={{ maxLength: 10, sx: { padding: "2px 4px 1px 0px" } }}
          inputProps={{ maxLength: 10 }}
          InputProps={{
            readOnly: startInput?.readonly,

            endAdornment: (
              <InputAdornment position="end" sx={{ marginLeft: "2px" }}>
                <Tooltip title={"Очистить фильтр"} disableInteractive>
                  <IconButton
                    size="small"
                    sx={{ padding: "0px" }}
                    onClick={clearDate("startDate")}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          //placeholder="dd.mm.yyyy"
          variant="standard"
          autoComplete="off"
          // required
          // helperText={dateFromValidation}
          onClick={inputFieldClick}
          onChange={parseFromDate}
          value={dateFrom}
        />
        <Box sx={{ mx: 2 }}> - </Box>
        <TextField
          //   className={classes.formFieldStyle}
          label={endInput?.label}
          name="dateTo"
          size="small"
          inputProps={{ maxLength: 10 }}
          InputProps={{
            readOnly: endInput?.readonly,
            endAdornment: (
              <InputAdornment position="end" sx={{ marginLeft: "2px" }}>
                <Tooltip title={"Очистить фильтр"} disableInteractive>
                  <IconButton
                    size="small"
                    sx={{ padding: "0px" }}
                    onClick={clearDate("endDate")}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          //placeholder="dd.mm.yyyy"
          variant="standard"
          autoComplete="off"
          // required
          // helperText={dateToValidation}
          onClick={inputFieldClick}
          onChange={parseToDate}
          value={dateTo}
        />
      </Grid>

      {/* <Popper
        open={openDateRangePicker}
        placement="bottom-start"
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      > */}
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        closeAfterTransition={true}
        onClose={handleClose}
      >
        {/* {({ TransitionProps }) => ( */}
        {/* <Grow {...TransitionProps}> */}
        {/* <Paper>
          <ClickAwayListener onClickAway={closeDateRangePicker}> */}
        <DateRangeMenu
          dateRange={daterange}
          minDate={minDateValid}
          maxDate={maxDateValid}
          ranges={definedRanges}
          firstMonth={firstMonth}
          secondMonth={secondMonth}
          setFirstMonth={setFirstMonthValidated}
          setSecondMonth={setSecondMonthValidated}
          setDateRange={setDateRangeValidated}
          helpers={helpers}
          handlers={handlers}
        />
        {/* </ClickAwayListener>
        </Paper> */}
        {/* </Grow> */}
        {/* )} */}
      </Popover>
    </Box>
  );
};
