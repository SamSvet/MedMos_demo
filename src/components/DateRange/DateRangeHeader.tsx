import React from "react";
import {
  Grid,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
// import { makeStyles, createStyles } from "@mui/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       justifyContent: "space-around",
//     },
//     iconContainer: {
//       padding: 5,
//     },
//     icon: {
//       padding: 10,
//       "&:hover": {
//         background: "none",
//       },
//     },
//   }),
// );

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

export const DateRangeHeader: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}) => {
  //   const classes = useStyles();
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    // event.preventDefault();
    // event.stopPropagation();

    setDate(setMonth(date, parseInt(event.target.value as string)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, parseInt(event.target.value as string)));
  };

  return (
    <Grid container alignItems="center" justifyContent={"space-around"}>
      <Grid item>
        <IconButton
          disabled={prevDisabled}
          onClick={onClickPrevious}
          sx={{
            padding: "10px",
            // "&:hover": {
            //   background: "none",
            // },
          }}
        >
          <ChevronLeft color={prevDisabled ? "disabled" : "action"} />
        </IconButton>
      </Grid>
      <Grid item>
        <Select
          variant="standard"
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
        >
          {MONTHS.map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item>
        <Select
          variant="standard"
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date, 30).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        {/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
      </Grid>
      <Grid item>
        <IconButton disabled={nextDisabled} onClick={onClickNext}>
          <ChevronRight color={nextDisabled ? "disabled" : "action"} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

// export default Header;
